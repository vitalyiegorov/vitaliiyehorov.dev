export const starVertexShader = `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
varying float vAlpha;

void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = (0.35 + 0.65 * aSeed) * (0.7 + 0.3 * sin(uTime * (0.4 + aSeed * 1.6) + aSeed * 60.0));
    gl_PointSize = (0.9 + aSeed * 1.9) * uPixelRatio;
}
`;
