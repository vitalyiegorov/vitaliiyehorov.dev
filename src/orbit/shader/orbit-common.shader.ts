export const orbitCommonShader = `
uniform float uTime;
uniform float uLine;
uniform float uCore;
uniform float uSpread;
uniform float uLit;
uniform float uDim;
uniform float uPixelRatio;

attribute vec4 aOrbit;
attribute vec4 aNode;

vec3 rotateX(vec3 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

vec3 rotateZ(vec3 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec3(p.x * c - p.y * s, p.x * s + p.y * c, p.z);
}

vec3 orbitPosition(float phase, float lift) {
    float angle = phase + uTime * aOrbit.w;
    vec3 p = vec3(cos(angle) * aOrbit.x, lift, sin(angle) * aOrbit.x);
    return rotateZ(rotateX(p, aOrbit.y), aOrbit.z) * uSpread;
}

vec3 linePosition() {
    float t = aNode.z;
    float a = t * 23.0 + uTime * 0.3;
    float r = 0.28 + aNode.w * 0.08;
    return vec3(cos(a) * r, (0.5 - t) * 16.0, sin(a) * r);
}

vec3 nodePosition() {
    float lineMix = smoothstep(aNode.z * 0.4, aNode.z * 0.4 + 0.6, uLine);
    vec3 p = mix(orbitPosition(aNode.x, (aNode.y - 0.5) * 0.18), linePosition(), lineMix);
    float coreMix = smoothstep(aNode.y * 0.45, aNode.y * 0.45 + 0.55, uCore);
    return mix(p, p * 0.02, coreMix);
}

float nodeLit() {
    return 1.0 - smoothstep(uLit - 0.06, uLit, aNode.z);
}
`;
