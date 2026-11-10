export const coreVertexShader = `
uniform float uCoreScale;
varying vec2 vUv;

void main() {
    vUv = uv - 0.5;
    vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    mv.xy += position.xy * uCoreScale;
    gl_Position = projectionMatrix * mv;
}
`;
