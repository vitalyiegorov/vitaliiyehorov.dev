import { orbitRings } from '../constant/orbit-rings.constant';

import { createRandom } from './create-random.util';

import type { OrbitGeometryData } from '../type/orbit-geometry-data.type';

const ringSegments = 180;

export const createOrbitGeometryData = (compact: boolean): OrbitGeometryData => {
    const random = createRandom(20101027);
    const orbit: number[] = [];
    const node: number[] = [];

    for (const ring of orbitRings) {
        const count = compact ? ring.mobileNodes : ring.nodes;
        for (let index = 0; index < count; index += 1) {
            const seed = random();
            orbit.push(ring.radius + (seed - 0.5) * ring.jitter, ring.tiltX, ring.tiltZ, ring.speed * (0.9 + random() * 0.2));
            node.push(((index + random() * 0.35) / count) * Math.PI * 2, seed, 0, ring.scale);
        }
    }

    const total = node.length / 4;
    const order = Array.from({ length: total }, (_, index) => index);
    for (let index = total - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1));
        const current = order[index] ?? 0;
        order[index] = order[swap] ?? 0;
        order[swap] = current;
    }
    const sequence: number[] = Array.from({ length: total }, () => 0);
    order.forEach((nodeIndex, rank) => {
        node[nodeIndex * 4 + 2] = rank / (total - 1);
        sequence[rank] = nodeIndex;
    });

    const linkOrbit: number[] = [];
    const linkData: number[] = [];
    const linkEnd: number[] = [];
    for (let index = 0; index < total; index += 1) {
        const isMajor = (node[index * 4 + 3] ?? 0) > 1;
        if (isMajor || index % 3 === 0) {
            for (const end of [0, 1]) {
                linkOrbit.push(...orbit.slice(index * 4, index * 4 + 4));
                linkData.push(...node.slice(index * 4, index * 4 + 4));
                linkEnd.push(end);
            }
        }
    }

    const spineOrbit: number[] = [];
    const spineData: number[] = [];
    for (let rank = 0; rank < total - 1; rank += 1) {
        for (const nodeIndex of [sequence[rank] ?? 0, sequence[rank + 1] ?? 0]) {
            spineOrbit.push(...orbit.slice(nodeIndex * 4, nodeIndex * 4 + 4));
            spineData.push(...node.slice(nodeIndex * 4, nodeIndex * 4 + 4));
        }
    }

    const ringOrbit: number[] = [];
    const ringData: number[] = [];
    orbitRings.forEach((ring, ringIndex) => {
        for (let segment = 0; segment < ringSegments; segment += 1) {
            for (const step of [segment, segment + 1]) {
                ringOrbit.push(ring.radius, ring.tiltX, ring.tiltZ, 0);
                ringData.push((step / ringSegments) * Math.PI * 2, ringIndex / orbitRings.length, 0, 1);
            }
        }
    });

    const starCount = compact ? 448 : 1500;
    const starPosition = new Float32Array(starCount * 3);
    const starSeed = new Float32Array(starCount);
    for (let index = 0; index < starCount; index += 1) {
        const theta = random() * Math.PI * 2;
        const phi = Math.acos(random() * 2 - 1);
        const radius = 18 + random() * 42;
        starPosition[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPosition[index * 3 + 1] = radius * Math.cos(phi) * 0.7;
        starPosition[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        starSeed[index] = random() ** 2.2;
    }

    return {
        nodeOrbit: new Float32Array(orbit),
        nodeData: new Float32Array(node),
        linkOrbit: new Float32Array(linkOrbit),
        linkData: new Float32Array(linkData),
        linkEnd: new Float32Array(linkEnd),
        spineOrbit: new Float32Array(spineOrbit),
        spineData: new Float32Array(spineData),
        ringOrbit: new Float32Array(ringOrbit),
        ringData: new Float32Array(ringData),
        starPosition,
        starSeed
    };
};
