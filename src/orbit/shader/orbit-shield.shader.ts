import { orbitShieldLimit } from '../constant/orbit-shield-limit.constant';

export const orbitShieldShader = `
uniform vec4 uShield[${orbitShieldLimit}];
uniform float uShieldFeather;
uniform vec4 uGuard;
uniform vec2 uGuardRange;

float shieldMask() {
    float mask = 1.0;
    for (int index = 0; index < ${orbitShieldLimit}; index++) {
        vec4 rect = uShield[index];
        vec2 outside = max(max(rect.xy - gl_FragCoord.xy, gl_FragCoord.xy - rect.zw), 0.0);
        float inside = 1.0 - smoothstep(0.0, uShieldFeather, length(outside));
        mask = rect.z > rect.x ? min(mask, 1.0 - inside * 0.88) : mask;
    }
    vec2 guardOutside = max(max(uGuard.xy - gl_FragCoord.xy, gl_FragCoord.xy - uGuard.zw), 0.0);
    float guard = uGuard.z > uGuard.x ? smoothstep(uGuardRange.x, uGuardRange.y, length(guardOutside)) : 1.0;
    return mask * guard;
}
`;
