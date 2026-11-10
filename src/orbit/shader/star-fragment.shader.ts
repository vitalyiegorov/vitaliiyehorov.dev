export const starFragmentShader = `
uniform float uStarDim;
uniform vec3 uBase;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha * uStarDim;
    gl_FragColor = vec4(uBase, a);
}
`;
