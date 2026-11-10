import { orbitCommonShader } from './orbit-common.shader';

export const linkVertexShader = `
${orbitCommonShader}
attribute float aEnd;
varying float vT;
varying float vLit;
varying float vSeed;

void main() {
    vec3 p = nodePosition() * aEnd;
    vT = aEnd;
    vLit = nodeLit();
    vSeed = aNode.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;
