export const castLineVertexShader = `
uniform vec2 uView;
attribute vec2 aShade;
varying float vAlpha;
varying float vLit;

void main() {
    vec2 ndc = vec2(position.x / uView.x * 2.0 - 1.0, 1.0 - position.y / uView.y * 2.0);
    gl_Position = vec4(ndc, 0.0, 1.0);
    vAlpha = aShade.x;
    vLit = aShade.y;
}
`;
