precision highp float;

uniform sampler2D layerSampler;
uniform vec2 textureSize;

void main(void) {
    vec2 coords = vec2(gl_FragCoord.x / textureSize.x, gl_FragCoord.y / textureSize.y);
    vec4 frag = texture2D(layerSampler, coords);

    gl_FragColor = frag;
}
