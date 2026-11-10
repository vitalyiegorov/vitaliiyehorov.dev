export const nodeFragmentShader = `
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vLit;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float hot = smoothstep(0.13, 0.0, d);
    float halo = smoothstep(0.5, 0.0, d);
    halo *= halo;
    vec3 color = mix(uBase, uAccent, vLit);
    color = mix(color, vec3(1.0), hot * 0.6);
    float a = (hot + halo * (0.28 + vLit * 0.5)) * vAlpha;
    gl_FragColor = vec4(color, a);
}
`;
