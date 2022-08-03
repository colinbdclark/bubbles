precision highp float;

const int MAX_LAYERS = 16;
const vec3 W = vec3(0.2126, 0.7152, 0.0722);

uniform int numReadyLayers;
uniform float gain;
uniform float opacity[MAX_LAYERS];
uniform float redScale[MAX_LAYERS];
uniform float greenScale[MAX_LAYERS];
uniform float blueScale[MAX_LAYERS];
uniform float keyerMin[MAX_LAYERS];
uniform float keyerMax[MAX_LAYERS];
uniform float brightness[MAX_LAYERS];
uniform float contrast[MAX_LAYERS];
uniform float saturation[MAX_LAYERS];
uniform sampler2D samplers[MAX_LAYERS];
uniform vec2 textureSize;

float clampUnipolar (float value) {
    if (value < 0.0) {
        value = 0.0;
    }

    return value;
}

float luma (vec3 fragment) {
    return dot(fragment, W);
}

vec3 brightnessContrast (vec3 fragment, float brightness,
    float contrast) {
    return (fragment - 0.5) * contrast + 0.5 + brightness;
}

vec3 saturate (vec3 fragment, float amount) {
    float l = luma(fragment);
    vec3 intensity = vec3(l);
    return mix(intensity, fragment, amount);
}

void main(void) {
    vec2 coords = vec2(gl_FragCoord.x / textureSize.x,
        gl_FragCoord.y / textureSize.y);

    vec3 layerSum = vec3(0.0, 0.0, 0.0);

    // TODO: The "there is no texture bound" warning will always happen,
    // even if the number of iterations is set to be lower (e.g. 1),
    // or if we only read from samplers[0].
    // But it will go away if we don't touch samplers at all.
    for (int i = 0; i < MAX_LAYERS; i++) {
        if (i >= numReadyLayers) {
            break;
        }
        vec4 frag = texture2D(samplers[i], coords);
        vec3 colour = frag.rgb;

        // 1. Apply brightness and contrast.
        colour = brightnessContrast(colour, brightness[i], contrast[i]);

        // 2. Scale colour channels.
        vec3 colourScale = vec3(
            clampUnipolar(redScale[i]),
            clampUnipolar(greenScale[i]),
            clampUnipolar(blueScale[i]));

        colour = colour * colourScale;

        // 3. Apply saturation.
        colour = saturate(colour, saturation[i]);

        // 4. Adjust overall opacity
        colour = colour * clampUnipolar(opacity[i]);

        // 5. Apply luma key.
        // TODO: Add some smoothstepping.
        float luma = luma(colour);
        if (luma < keyerMin[i] || luma > keyerMax[i]) {
            // 6. Sum pixel with other layers if it isn't keyed out.
            layerSum = layerSum + colour;
        }
    }

    // 7. Apply gain to all layers.
    layerSum = layerSum * clampUnipolar(gain);

    gl_FragColor = vec4(layerSum.r, layerSum.g, layerSum.b, 1.0);
}
