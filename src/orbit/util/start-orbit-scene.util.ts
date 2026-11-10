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
import { readStage } from './read-stage.util';

import type { OrbitFrame } from '../type/orbit-frame.type';
import type { StageBox } from '../type/stage-box.type';

interface Callbacks {
    readonly onReady: () => void;
    readonly onLost: () => void;
}

const lineStage = 3;

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
    const camera = new PerspectiveCamera(40, 1, 0.1, 200);
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
    let stages: StageBox[] = [];
    let aspect = 1;
    let frame = 0;
    let running = false;
    let visible = !document.hidden;
    let onScreen = true;
    let last = performance.now();
    let time = reducedMotion ? 18 : 0;
    let first = true;

    const resize = (): void => {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        aspect = width / height;
        renderer.setSize(width, height, false);
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        stages = measureStages();
    };

    const apply = (dt: number): void => {
        const raw = reducedMotion ? 0.5 : readStage(stages, window.scrollY, window.innerHeight);
        blendFrames(raw, target);
        const travel = Math.min(Math.max(raw - (lineStage + 0.5), -0.5), 0.5);
        target.y += travel * 11 * target.line;
        target.lit = Math.min(target.lit + travel * 0.9 * target.line, 1);
        const narrow = aspect < 0.9;
        if (narrow) {
            target.x *= 0.12;
            target.y += target.narrowY;
            target.dim *= target.narrowDim;
            target.coreGlow *= target.narrowDim;
            target.distance *= 1 + (1 - aspect) * 1.05;
        }
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
        right.set(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(current.x);
        system.position.set(right.x, right.y + current.y, right.z);
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
        const shouldRun = !reducedMotion && visible && onScreen;
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
        running = false;
        window.cancelAnimationFrame(frame);
        callbacks.onLost();
    };

    const resizeObserver = new ResizeObserver(() => {
        resize();
        if (reducedMotion) {
            renderStill();
        }
    });
    resizeObserver.observe(canvas);
    resizeObserver.observe(document.body);
    const intersectionObserver = new IntersectionObserver(entries => {
        onScreen = entries.some(entry => entry.isIntersecting);
        sync();
    });
    intersectionObserver.observe(canvas);
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
        intersectionObserver.disconnect();
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
