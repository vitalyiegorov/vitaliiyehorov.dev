export const linkFragmentShader = `
uniform float uTime;
uniform float uDim;
uniform float uPulse;
uniform float uLinks;
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vT;
varying float vLit;
varying float vSeed;

void main() {
    float head = fract(uTime * (0.12 + vSeed * 0.2) + vSeed * 7.0);
    head = vSeed > 0.62 ? 1.0 - head : head;
    float pulse = exp(-pow((vT - head) * 10.0, 2.0)) * uPulse;
    float fade = smoothstep(0.02, 0.3, vT);
    float a = (0.035 + 0.06 * vLit + pulse * (0.3 + 0.45 * vLit)) * fade * uLinks * uDim;
    vec3 color = mix(uBase, uAccent, clamp(vLit * 0.7 + pulse * 0.6, 0.0, 1.0));
    gl_FragColor = vec4(color, a);
}
`;
