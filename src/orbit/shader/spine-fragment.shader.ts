import { orbitShieldShader } from './orbit-shield.shader';

export const spineFragmentShader = `
${orbitShieldShader}
uniform float uLine;
uniform float uDim;
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vLit;

void main() {
    float a = (0.1 + vLit * 0.22) * smoothstep(0.55, 1.0, uLine) * uDim;
    gl_FragColor = vec4(mix(uBase, uAccent, vLit), a * shieldMask());
}
`;
