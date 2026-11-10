import { orbitShieldShader } from './orbit-shield.shader';

export const castLineFragmentShader = `
${orbitShieldShader}
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vAlpha;
varying float vLit;

void main() {
    gl_FragColor = vec4(mix(uBase, uAccent, vLit), vAlpha * shieldMask());
}
`;
