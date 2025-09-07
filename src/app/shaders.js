// shaders.js

// Vertex shader for simulation (passes UVs)
export const simulationVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader for simulation (ripple physics)
export const simulationFragmentShader = `
precision highp float;
uniform sampler2D textureA;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 prevMouse;
uniform float time;
uniform float frame;
varying vec2 vUv;

void main() {
    vec2 uv = vUv * resolution;
    vec4 data = texture2D(textureA, vUv);
    float pressure = data.x;
    float pVel = data.y;

    vec4 right = texture2D(textureA, vUv + vec2(1.0/resolution.x, 0.0));
    vec4 left = texture2D(textureA, vUv - vec2(1.0/resolution.x, 0.0));
    vec4 up = texture2D(textureA, vUv + vec2(0.0, 1.0/resolution.y));
    vec4 down = texture2D(textureA, vUv - vec2(0.0, 1.0/resolution.y));

    pVel += (-2.0*pressure + right.x + left.x)/4.0;
    pVel += (-2.0*pressure + up.x + down.x)/4.0;
    pressure += pVel;
    pVel *= 0.995;
    pressure *= 0.999;

    // Only add pressure if mouse moved
    if(mouse.x > 0.0 && distance(mouse, prevMouse) > 0.0) {
        float dist = distance(uv, mouse);
        if(dist < 20.0) pressure += (20.0 - dist) * 0.1;
    }

    gl_FragColor = vec4(pressure, pVel, 0.0, 1.0);
}
`;

// Vertex shader for rendering (passes UVs)
export const renderVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

export const renderFragmentShader = `
precision highp float;
uniform sampler2D textureA; // ripple
uniform sampler2D textureB; // text
varying vec2 vUv;

void main() {
    vec4 ripple = texture2D(textureA, vUv);
    vec2 offsetUV = vUv + ripple.xy * 0.05; // ripple strength

    vec4 textColor = texture2D(textureB, offsetUV);

    // Gentlerain background color
    vec3 bgColor = vec3(0.96, 0.96, 0.98); // #F4F6F9

    // Gentlerain text color
    vec3 textBaseColor = vec3(0.18, 0.18, 0.18); // #2D2D2D

    // Subtle gray ripple color
    vec3 rippleColor = vec3(0.9);
    float rippleAlpha = ripple.x * 0.3;

    // Blend ripple over background
    vec3 colorWithRipple = mix(bgColor, rippleColor, rippleAlpha);

    // Apply text distortion
    vec4 finalTextColor = texture2D(textureB, offsetUV);
    vec3 finalColor = mix(colorWithRipple, finalTextColor.rgb, finalTextColor.a);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

