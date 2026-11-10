import { orbitCommonShader } from './orbit-common.shader';

export const spineVertexShader = `
${orbitCommonShader}
varying float vLit;

void main() {
    vLit = nodeLit();
    gl_Position = projectionMatrix * modelViewMatrix * vec4(nodePosition(), 1.0);
}
`;
