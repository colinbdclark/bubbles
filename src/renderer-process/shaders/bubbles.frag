precision highp float;

const int MAX_LAYERS = 16;

uniform int numLayers;
uniform sampler2D layerSamplers[MAX_LAYERS];
uniform vec2 textureSize;

void main(void) {
    vec2 coords = vec2(gl_FragCoord.x / textureSize.x, gl_FragCoord.y / textureSize.y);

    float scale = float(numLayers);
    vec4 layerSum = vec4(0.0, 0.0, 0.0, 1.0);

    for (int i = 0; i < MAX_LAYERS; i++) {
        if (i > numLayers) {
            break;
        }
        vec4 frag = texture2D(layerSamplers[i], coords);
        layerSum.rgb = layerSum.rgb + (frag.rgb / scale);
    }

    gl_FragColor = layerSum;
}
