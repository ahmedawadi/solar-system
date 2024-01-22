export default /* glsl */ `
    
    uniform float u_time;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main(){
        vUv = uv;
        vec3 newPosition = position;
        vPosition = position;

        if(position.z >  0.0001){
            newPosition.x = 0.0;
            newPosition.z = 0.0;
            newPosition.y = 0.0;
        }

        vec4 pos = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        gl_Position = pos;
    }

`