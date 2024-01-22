export default /*glsl */`

    uniform sampler2D sunTexture;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float u_time;

    void main() {
        vec4 sun = texture2D(sunTexture, vUv);

        gl_FragColor = sun;

    }
`;