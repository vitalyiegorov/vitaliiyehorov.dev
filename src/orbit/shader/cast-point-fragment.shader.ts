import { orbitShieldShader } from './orbit-shield.shader';

export const castPointFragmentShader = `
${orbitShieldShader}
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vAlpha;
varying float vLit;
varying float vKind;
varying float vHollow;
varying float vSize;

void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    vec3 tint = mix(uBase, uAccent, vLit);
    vec3 color;
    float a;
    if (vKind > 1.5) {
        float soft = 1.0 - smoothstep(0.0, 1.0, d);
        color = tint;
        a = soft * soft * vAlpha;
    } else if (vKind > 0.5) {
        float breathe = 0.9 + 0.1 * sin(uTime * 1.4);
        float hot = exp(-d * d * 140.0);
        float glow = exp(-d * d * 14.0) * 0.5;
        float halo = exp(-d * 3.6) * 0.2;
        float ringR = 0.3 + 0.015 * sin(uTime * 0.8);
        float ring = (1.0 - smoothstep(0.0, 0.012, abs(d - ringR))) * 0.22;
        color = mix(uAccent, vec3(1.0), clamp(hot * 1.4, 0.0, 1.0));
        a = (hot * 1.6 + glow + halo + ring) * breathe * vAlpha * (1.0 - smoothstep(0.7, 0.95, d));
    } else {
        float hot = 1.0 - smoothstep(0.0, 0.34, d);
        float halo = 1.0 - smoothstep(0.0, 1.0, d);
        halo *= halo;
        float ring = (1.0 - smoothstep(0.0, 0.07, abs(d - 0.66))) * smoothstep(0.55, 1.0, vLit) * 0.45;
        color = mix(tint, vec3(1.0), hot * 0.6);
        a = hot + halo * (0.28 + vLit * 0.5) + ring;
        if (vHollow > 0.001) {
            float unit = 2.0 / vSize;
            float hollow = 1.0 - smoothstep(0.7 * unit, 1.3 * unit, abs(d - 4.0 * unit));
            color = mix(color, uAccent, vHollow);
            a = mix(a, hollow, vHollow);
        }
        a *= vAlpha;
    }
    a += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.01;
    gl_FragColor = vec4(color, max(a, 0.0) * shieldMask());
}
`;
