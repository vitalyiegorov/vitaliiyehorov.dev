export const castPointVertexShader = `
uniform vec2 uView;
uniform float uPixelRatio;
attribute vec4 aCast;
attribute float aKind;
varying float vAlpha;
varying float vLit;
varying float vKind;
varying float vHollow;
varying float vSize;

void main() {
    vec2 ndc = vec2(position.x / uView.x * 2.0 - 1.0, 1.0 - position.y / uView.y * 2.0);
    gl_Position = vec4(ndc, 0.0, 1.0);
    vAlpha = aCast.y;
    vLit = aCast.z;
    vKind = aKind;
    vHollow = aCast.w;
    vSize = max(aCast.x, 1.0);
    gl_PointSize = aCast.y > 0.002 ? aCast.x * uPixelRatio : 0.0;
}
`;
