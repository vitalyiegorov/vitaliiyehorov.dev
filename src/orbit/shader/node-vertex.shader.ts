import { orbitCommonShader } from './orbit-common.shader';

export const nodeVertexShader = `
${orbitCommonShader}
uniform float uSize;
varying float vLit;
varying float vAlpha;

void main() {
    vec3 p = nodePosition();
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vLit = nodeLit();
    float twinkle = 0.78 + 0.22 * sin(uTime * (1.1 + aNode.y * 2.3) + aNode.y * 40.0);
    vAlpha = twinkle * uDim;
    float size = uSize * aNode.w * (0.75 + aNode.y * 0.5) * (1.0 + vLit * 0.45) * (1.0 + uCore * 0.6);
    gl_PointSize = clamp(size * uPixelRatio * (10.0 / -mv.z), 1.0, 96.0);
}
`;
