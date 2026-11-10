import { orbitCommonShader } from './orbit-common.shader';

export const ringVertexShader = `
${orbitCommonShader}
varying float vGlint;

void main() {
    vec3 p = orbitPosition(aNode.x, 0.0);
    vGlint = pow(0.5 + 0.5 * sin(aNode.x * 2.0 - uTime * (0.35 + aNode.y * 0.4) + aNode.y * 9.0), 10.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;
