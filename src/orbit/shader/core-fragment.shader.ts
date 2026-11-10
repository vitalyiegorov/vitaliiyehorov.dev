export const coreFragmentShader = `
uniform float uTime;
uniform float uDim;
uniform float uCoreGlow;
uniform vec3 uAccent;
varying vec2 vUv;

void main() {
    float d = length(vUv) * 2.0;
    float breathe = 0.9 + 0.1 * sin(uTime * 1.4);
    float hot = exp(-d * d * 140.0);
    float glow = exp(-d * d * 14.0) * 0.5;
    float halo = exp(-d * 3.6) * 0.2;
    float ringR = 0.3 + 0.015 * sin(uTime * 0.8);
    float ring = (1.0 - smoothstep(0.0, 0.012, abs(d - ringR))) * 0.22;
    vec3 color = mix(uAccent, vec3(1.0), clamp(hot * 1.4, 0.0, 1.0));
    float a = (hot * 1.6 + glow + halo + ring) * uCoreGlow * breathe * uDim;
    a += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.024;
    a = max(a, 0.0) * (1.0 - smoothstep(0.7, 0.95, d));
    gl_FragColor = vec4(color, a);
}
`;
