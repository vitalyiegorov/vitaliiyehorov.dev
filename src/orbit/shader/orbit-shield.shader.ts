export const orbitShieldShader = `
uniform vec4 uShield[6];
uniform float uShieldFeather;

float shieldMask() {
    float mask = 1.0;
    for (int index = 0; index < 6; index++) {
        vec4 rect = uShield[index];
        vec2 outside = max(max(rect.xy - gl_FragCoord.xy, gl_FragCoord.xy - rect.zw), 0.0);
        float inside = 1.0 - smoothstep(0.0, uShieldFeather, length(outside));
        mask = rect.z > rect.x ? min(mask, 1.0 - inside * 0.88) : mask;
    }
    return mask;
}
`;
