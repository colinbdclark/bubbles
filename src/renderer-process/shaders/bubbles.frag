precision highp float;

const int MAX_LAYERS = 16;

uniform int numReadyLayers;
uniform float opacities[MAX_LAYERS];
uniform float redScale[MAX_LAYERS];
uniform float greenScale[MAX_LAYERS];
uniform float blueScale[MAX_LAYERS];
uniform float clip[MAX_LAYERS];
uniform sampler2D samplers[MAX_LAYERS];
uniform vec2 textureSize;

float luma (vec4 fragment) {
    return (fragment.r * 0.2126) + (fragment.g * 0.7152) + (fragment.b * 0.0722);
}

void main(void) {
    vec2 coords = vec2(gl_FragCoord.x / textureSize.x, gl_FragCoord.y / textureSize.y);

    float scale = float(numReadyLayers);
    vec4 layerSum = vec4(0.0, 0.0, 0.0, 1.0);

    // TODO: The "there is no texture bound" warning will always happen,
    // even if the number of iterations is set to be lower (e.g. 1),
    // or if we only read from samplers[0].
    // But it will go away if we don't touch samplers at all.
    for (int i = 0; i < MAX_LAYERS; i++) {
        if (i >= numReadyLayers) {
            break;
        }
        vec4 frag = texture2D(samplers[i], coords);
        float luma = luma(frag);

        if (luma <= clip[i]) {
            vec3 colourScale = vec3(redScale[i],
                greenScale[i], blueScale[i]);

            layerSum.rgb = layerSum.rgb +
                (frag.rgb * colourScale.rgb * opacities[i]);
        }
    }

    gl_FragColor = layerSum;
}
