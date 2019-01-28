precision highp float;

const int MAX_LAYERS = 16;

uniform int numReadyLayers;
uniform float layerOpacities[MAX_LAYERS];
uniform sampler2D layerSamplers[MAX_LAYERS];
uniform vec2 textureSize;

void main(void) {
    vec2 coords = vec2(gl_FragCoord.x / textureSize.x, gl_FragCoord.y / textureSize.y);

    float scale = float(numReadyLayers);
    vec4 layerSum = vec4(0.0, 0.0, 0.0, 1.0);

    // TODO: The "there is no texture bound" warning will always happen,
    // even if the number of iterations is set to be lower (e.g. 1),
    // or if we only read from layerSamplers[0].
    // But it will go away if we don't touch layerSamplers at all.
    for (int i = 0; i < MAX_LAYERS; i++) {
        if (i >= numReadyLayers) {
            break;
        }
        vec4 frag = texture2D(layerSamplers[i], coords);
        layerSum.rgb = layerSum.rgb + (frag.rgb * layerOpacities[i]);
    }

    gl_FragColor = layerSum;
}
