import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Group,
    LineSegments,
    Mesh,
    PerspectiveCamera,
    PlaneGeometry,
    Points,
    Scene,
    ShaderMaterial,
    Vector3,
    Vector4,
    WebGLRenderer
} from 'three';

import { orbitFrameKeys } from '../constant/orbit-frame-keys.constant';
import { orbitFrames } from '../constant/orbit-frames.constant';
import { coreFragmentShader } from '../shader/core-fragment.shader';
import { coreVertexShader } from '../shader/core-vertex.shader';
import { linkFragmentShader } from '../shader/link-fragment.shader';
import { linkVertexShader } from '../shader/link-vertex.shader';
import { nodeFragmentShader } from '../shader/node-fragment.shader';
import { nodeVertexShader } from '../shader/node-vertex.shader';
import { ringFragmentShader } from '../shader/ring-fragment.shader';
import { ringVertexShader } from '../shader/ring-vertex.shader';
import { spineFragmentShader } from '../shader/spine-fragment.shader';
import { spineVertexShader } from '../shader/spine-vertex.shader';
import { starFragmentShader } from '../shader/star-fragment.shader';
import { starVertexShader } from '../shader/star-vertex.shader';

import { blendFrames } from './blend-frames.util';
import { createOrbitGeometryData } from './create-orbit-geometry-data.util';
import { measureStages } from './measure-stages.util';
import { readCoverFade } from './read-cover-fade.util';
import { readNarrowDrift } from './read-narrow-drift.util';
import { readStage } from './read-stage.util';

import type { OrbitFrame } from '../type/orbit-frame.type';
import type { StageBox } from '../type/stage-box.type';

interface Callbacks {
    readonly onReady: () => void;
    readonly onLost: () => void;
}

const lineStage = 3;
const fov = 40;
const halfFov = Math.tan((fov * Math.PI) / 360);
const narrowAspect = 390 / 844;
const wideAspect = 1.6;
const shortAspect = 1280 / 720;
const lineHalfLength = 8;
const anchorGap = 48;
const shieldLimit = 6;
const shieldPad = 12;
const shieldFeather = 44;

const orbitGeometry = (orbit: Float32Array, node: Float32Array): BufferGeometry => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array((orbit.length / 4) * 3), 3));
    geometry.setAttribute('aOrbit', new BufferAttribute(orbit, 4));
    geometry.setAttribute('aNode', new BufferAttribute(node, 4));

    return geometry;
};

export const startOrbitScene = (canvas: HTMLCanvasElement, callbacks: Callbacks): (() => void) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const compact = Math.min(window.innerWidth, window.innerHeight) < 700;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: pixelRatio < 1.5, powerPreference: 'default' });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(fov, 1, 0.1, 200);
    const system = new Group();
    scene.add(system);

    const data = createOrbitGeometryData(compact);
    const uniforms = {
        uTime: { value: 0 },
        uLine: { value: 0 },
        uCore: { value: 0 },
        uSpread: { value: 1 },
        uLit: { value: 0 },
        uDim: { value: 1 },
        uPixelRatio: { value: pixelRatio },
        uSize: { value: compact ? 9 : 11 },
        uPulse: { value: 1 },
        uLinks: { value: 1 },
        uRings: { value: 1 },
        uCoreGlow: { value: 1 },
        uCoreScale: { value: 3 },
        uStarDim: { value: 1 },
        uShield: { value: Array.from({ length: shieldLimit }, () => new Vector4(0, 0, -1, -1)) },
        uShieldFeather: { value: shieldFeather * pixelRatio },
        uBase: { value: new Vector3(0.78, 0.85, 0.91) },
        uAccent: { value: new Vector3(0.78, 0.98, 0.31) }
    };
    const material = (vertexShader: string, fragmentShader: string): ShaderMaterial =>
        new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: AdditiveBlending });

    const starGeometry = new BufferGeometry();
    starGeometry.setAttribute('position', new BufferAttribute(data.starPosition, 3));
    starGeometry.setAttribute('aSeed', new BufferAttribute(data.starSeed, 1));
    const stars = new Points(starGeometry, material(starVertexShader, starFragmentShader));
    scene.add(stars);

    const rings = new LineSegments(orbitGeometry(data.ringOrbit, data.ringData), material(ringVertexShader, ringFragmentShader));
    const linkGeometry = orbitGeometry(data.linkOrbit, data.linkData);
    linkGeometry.setAttribute('aEnd', new BufferAttribute(data.linkEnd, 1));
    const links = new LineSegments(linkGeometry, material(linkVertexShader, linkFragmentShader));
    const spine = new LineSegments(orbitGeometry(data.spineOrbit, data.spineData), material(spineVertexShader, spineFragmentShader));
    const nodes = new Points(orbitGeometry(data.nodeOrbit, data.nodeData), material(nodeVertexShader, nodeFragmentShader));
    const core = new Mesh(new PlaneGeometry(1, 1), material(coreVertexShader, coreFragmentShader));
    for (const object of [rings, links, spine, nodes, core]) {
        object.frustumCulled = false;
        system.add(object);
    }
    stars.frustumCulled = false;

    const current: OrbitFrame = { ...orbitFrames[0] };
    const target: OrbitFrame = { ...current };
    const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
    const right = new Vector3();
    const up = new Vector3();
    let stages: StageBox[] = [];
    let anchor: HTMLElement | null = null;
    let shields: HTMLElement[] = [];
    let aspect = 1;
    let frame = 0;
    let running = false;
    let lost = false;
    let visible = !document.hidden;
    let last = performance.now();
    let time = reducedMotion ? 18 : 0;
    let first = true;
    let paused = document.documentElement.dataset.motion === 'paused';

    const resize = (): void => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        aspect = width / height;
        renderer.setSize(width, height, false);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        stages = measureStages(aspect >= 0.9);
        anchor = document.querySelector<HTMLElement>('[data-orbit-anchor]');
        shields = Array.from(document.querySelectorAll<HTMLElement>('[data-orbit-shield]')).filter(
            element => element.dataset.orbitShield !== (aspect >= 0.9 ? 'narrow' : 'wide')
        );
    };

    const updateShields = (): void => {
        const height = canvas.clientHeight || window.innerHeight;
        let count = 0;
        for (const element of shields) {
            const rect = element.getBoundingClientRect();
            const slot = uniforms.uShield.value[count];
            if (!slot) {
                break;
            }
            if (rect.width > 0 && rect.bottom > -shieldFeather && rect.top < height + shieldFeather) {
                slot.set(
                    (rect.left - shieldPad) * pixelRatio,
                    (height - rect.bottom - shieldPad) * pixelRatio,
                    (rect.right + shieldPad) * pixelRatio,
                    (height - rect.top + shieldPad) * pixelRatio
                );
                count += 1;
            }
        }
        for (const slot of uniforms.uShield.value.slice(count)) {
            slot.set(0, 0, -1, -1);
        }
    };

    const apply = (dt: number): void => {
        const stage = reducedMotion ? 0 : readStage(stages, window.scrollY, window.innerHeight);
        blendFrames(stage, target);
        const transit = 1 - Math.sin(Math.PI * (stage - Math.floor(stage))) ** 0.35 * 0.85;
        target.dim *= transit;
        target.coreGlow *= transit;
        const line = stages[lineStage];
        const travel = line ? Math.min(Math.max((window.scrollY + window.innerHeight * 0.5 - line.top) / line.height, 0), 1) - 0.5 : 0;
        target.lit = Math.min(target.lit + travel * 0.9 * target.line, 1);
        if (aspect < 0.9) {
            target.x = target.narrowX;
            target.y = target.narrowY + readNarrowDrift(stages, stage, window.scrollY, window.innerHeight);
            target.distance = (target.narrowDistance * narrowAspect) / aspect;
            target.elevation = target.narrowElevation;
            target.spread = target.narrowSpread;
            target.dim *= target.narrowDim;
            target.links *= target.narrowDim;
            target.coreGlow *= target.narrowDim;
        } else {
            const short = Math.min(Math.max((aspect - wideAspect) / (shortAspect - wideAspect), 0), 1);
            target.x += (target.shortX - target.x) * short;
            target.y += (target.shortY - target.y) * short;
            target.distance += (target.shortDistance - target.distance) * short;
            if (anchor) {
                const top = 1 - (2 * (anchor.getBoundingClientRect().bottom + anchorGap)) / window.innerHeight;
                const lineY = top - (lineHalfLength * Math.cos(target.elevation)) / (target.distance * halfFov);
                target.y += (lineY - target.y) * target.line;
            }
        }
        const cover = readCoverFade(stages, stage, ((1 - target.y) * window.innerHeight) / 2, window.innerHeight);
        target.dim *= cover;
        target.coreGlow *= cover;
        const ease = first ? 1 : 1 - Math.exp(-dt * 2.2);
        for (const key of orbitFrameKeys) {
            current[key] += (target[key] - current[key]) * ease;
        }
        pointer.smoothX += (pointer.x - pointer.smoothX) * (1 - Math.exp(-dt * 2));
        pointer.smoothY += (pointer.y - pointer.smoothY) * (1 - Math.exp(-dt * 2));

        const yaw = current.yaw + pointer.smoothX * 0.16;
        const elevation = current.elevation + pointer.smoothY * 0.07;
        camera.position.set(
            Math.sin(yaw) * Math.cos(elevation) * current.distance,
            Math.sin(elevation) * current.distance,
            Math.cos(yaw) * Math.cos(elevation) * current.distance
        );
        camera.lookAt(0, 0, 0);
        const halfHeight = current.distance * halfFov;
        right
            .set(1, 0, 0)
            .applyQuaternion(camera.quaternion)
            .multiplyScalar(current.x * halfHeight * aspect);
        up.set(0, 1, 0)
            .applyQuaternion(camera.quaternion)
            .multiplyScalar(current.y * halfHeight);
        system.position.copy(right).add(up);
        system.rotation.y = time * 0.025 * (1 - current.line);

        uniforms.uTime.value = time;
        uniforms.uLine.value = current.line;
        uniforms.uCore.value = current.core;
        uniforms.uSpread.value = current.spread;
        uniforms.uLit.value = current.lit;
        uniforms.uDim.value = current.dim;
        uniforms.uPulse.value = current.pulse;
        uniforms.uLinks.value = current.links;
        uniforms.uRings.value = current.rings;
        uniforms.uCoreGlow.value = current.coreGlow;
        uniforms.uCoreScale.value = current.coreScale;
        uniforms.uStarDim.value = 0.55 + current.dim * 0.45;
        updateShields();
        first = false;
    };

    const render = (now: number): void => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        time += dt;
        apply(dt);
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(render);
    };

    const sync = (): void => {
        const shouldRun = !reducedMotion && !paused && visible && !lost;
        if (shouldRun && !running) {
            running = true;
            last = performance.now();
            frame = window.requestAnimationFrame(render);
        }
        if (!shouldRun && running) {
            running = false;
            window.cancelAnimationFrame(frame);
        }
    };

    const renderStill = (): void => {
        apply(0);
        renderer.render(scene, camera);
    };

    const onVisibility = (): void => {
        visible = !document.hidden;
        sync();
    };
    const onPointer = (event: PointerEvent): void => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onLost = (event: Event): void => {
        event.preventDefault();
        lost = true;
        running = false;
        window.cancelAnimationFrame(frame);
        callbacks.onLost();
    };

    const resizeObserver = new ResizeObserver(() => {
        resize();
        if (!running) {
            renderStill();
        }
    });
    resizeObserver.observe(canvas);
    resizeObserver.observe(document.body);
    const motionObserver = new MutationObserver(() => {
        paused = document.documentElement.dataset.motion === 'paused';
        sync();
    });
    motionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onLost);
    if (finePointer && !reducedMotion) {
        window.addEventListener('pointermove', onPointer, { passive: true });
    }

    resize();
    renderStill();
    callbacks.onReady();
    sync();

    return () => {
        running = false;
        window.cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        motionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        canvas.removeEventListener('webglcontextlost', onLost);
        window.removeEventListener('pointermove', onPointer);
        scene.traverse(object => {
            if (object instanceof Mesh || object instanceof Points || object instanceof LineSegments) {
                object.geometry.dispose();
                if (object.material instanceof ShaderMaterial) {
                    object.material.dispose();
                }
            }
        });
        renderer.dispose();
    };
};
