export const ringFragmentShader = `
uniform float uRings;
uniform float uDim;
uniform vec3 uBase;
uniform vec3 uAccent;
varying float vGlint;

void main() {
    float a = (0.075 + vGlint * 0.3) * uRings * uDim;
    gl_FragColor = vec4(mix(uBase, uAccent, vGlint * 0.8), a);
}
`;
