'use client'
import { useEffect, useRef } from "react";
import fragmentShader from './fragmentShader.glsl'
import vertexShader from './vertexShader.glsl'
import { render } from "react-dom";
import { BoxGeometry, CapsuleGeometry, Clock, Color, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, ShaderMaterial, SphereGeometry, TextureLoader, WebGLRenderer } from "three";

export default function Sun3DDisplay({}){

    const sunTexture = new TextureLoader().load("solarSystemImages/sun.jpg")
    const uniforms = {
        u_time: {
            type: 'f', value: 0.0
        },
        sunTexture: {
            type : 't',
            value: sunTexture
        }
    }

    const clock = new Clock()
    const camera = new PerspectiveCamera((50, window.innerWidth/window.innerHeight, 0.1, 999))
    const planetNucleus = new Mesh(new SphereGeometry(1.25), new MeshBasicMaterial({color: '#fa5c00', emissiveIntensity: 1.0}))
    const planetRadiation = new Mesh(new SphereGeometry(2), new ShaderMaterial({ uniforms,
        fragmentShader : `

            uniform sampler2D sunTexture; 
            varying vec2 vUv;

            void main(){
                gl_FragColor = texture2D(sunTexture, vUv);
            }
        `, vertexShader : `
            varying vec2 vUv;

            void main(){
                vUv = uv;
                vec3 newPosition = position;

                if(position.x >  0.0001 && position.z > 0.001){
                    newPosition.x = -0.1;
                    newPosition.z = -0.1;
                    newPosition.y = -0.1;
                }

                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `
    }))
    const planet = new Mesh(new SphereGeometry(4), new ShaderMaterial({uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader}))
    const light = new PointLight(0xffffff, 1,10)
    const planetRef = useRef(null)
    const scene = new Scene()

    camera.position.set(0, 0, 12)

    planetRadiation.position.set(0, 0, 0)
    planetNucleus.position.set(0, 0, 0)
    planet.position.set(0, 0, 0)

    const sunRays = new Mesh(new SphereGeometry(5.5), new MeshBasicMaterial({color:'#942b07', opacity: 0.5}))
    
    scene.add(light)
    scene.add(planetNucleus)
    scene.add(planet)
    scene.add(planetRadiation)

    useEffect(() => {
        if(planetRef.current){

            const planetCanvas = planetRef.current
            const renderer = new WebGLRenderer({canvas: planetCanvas, alpha: true})
            
            // renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.render(scene, camera)
            renderer.setSize(600, 600)

            function animate(){

                uniforms.u_time.value = clock.getElapsedTime()
                planet.rotation.y += 0.005
                planetRadiation.rotation.y += 0.005
                planetNucleus.rotation.y += 0.005

                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }

            animate()

        }
    }, [])

    return <canvas ref={planetRef} className="w-full h-full"></canvas>
} 