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
varying float vFocus;
varying float vCrown;

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
        float dn = d * (1.0 + 0.5 * vCrown);
        float hot = 1.0 - smoothstep(0.0, 0.34, dn);
        float halo = 1.0 - smoothstep(0.0, 1.0, dn);
        halo *= halo;
        float ring = (1.0 - smoothstep(0.0, 0.07, abs(dn - 0.66))) * vFocus * 0.5;
        float breathe = 0.75 + 0.25 * sin(uTime * 1.2);
        float crownRing = (1.0 - smoothstep(0.0, 0.08, abs(dn - 1.04))) * vCrown * 0.34;
        float aura = exp(-dn * dn * 2.4) * vCrown * 0.42 * breathe * (1.0 - smoothstep(0.8, 1.0, d));
        color = mix(tint, vec3(1.0), hot * (0.25 + 0.35 * max(vFocus, vCrown)));
        a = hot + halo * (0.28 + vLit * 0.5 + vFocus * 0.3) + ring + crownRing + aura;
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
