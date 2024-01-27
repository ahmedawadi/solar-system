'use client'

import { useEffect, useRef } from "react"
import { render } from "react-dom"
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, Sphere, SphereGeometry, TextureLoader, Vector3, WebGL1Renderer, WebGLRenderer } from "three"

export default function Earth3DDisplay({}){
    const earthRef = useRef()
    const scene = new Scene()
    const light = new PointLight(0xffffff, 1, 10)
    const camera = new PerspectiveCamera((50, window.innerWidth/window.innerHeight, 0.1, 999))
    const textureLoader = new TextureLoader()
    const earthGeometry = new SphereGeometry(5);
    const earthTexture = new MeshBasicMaterial({map: textureLoader.load("solarSystemImages/earth.jpg")})
    const earth = new Mesh(earthGeometry, earthTexture)
    const earthCloud = new Mesh(new SphereGeometry(4.3), new MeshBasicMaterial({map:textureLoader.load("solarSystemImages/earthCloud.jpg"), opacity: 0.5}))
    console.log(textureLoader.load("solarSystemImages/earth.jpg"))
    earth.position.set(0, 0, 0)
    earthCloud.position.set(0, 0, 0)
    camera.position.set(0, 0, 13)

    scene.add(earth)
    scene.add(light)
    scene.add(earthCloud)

    useEffect(() => {

        const earthCanvas = earthRef.current
        const renderer = new WebGLRenderer({canvas: earthCanvas, alpha:true})

        renderer.render(scene, camera)

        function animate(){
            // earth.rotation.y += 0.01
            
            requestAnimationFrame(animate)
        }

        animate()

    }, [])
    
    return <canvas ref={earthRef} className="w-full h-full"></canvas>
}