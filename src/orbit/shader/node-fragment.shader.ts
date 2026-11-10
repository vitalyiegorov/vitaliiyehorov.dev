export const nodeFragmentShader = `
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vLit;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float hot = 1.0 - smoothstep(0.0, 0.13, d);
    float halo = 1.0 - smoothstep(0.0, 0.5, d);
    halo *= halo;
    vec3 color = mix(uBase, uAccent, vLit);
    color = mix(color, vec3(1.0), hot * 0.6);
    float a = (hot + halo * (0.28 + vLit * 0.5)) * vAlpha;
    a += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.01;
    gl_FragColor = vec4(color, max(a, 0.0));
}
`;
