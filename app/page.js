'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { render } from 'react-dom';
import { BoxGeometry, Camera, CapsuleGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from 'three'
import Planet from './solar-system/sun/sun3DComponet';

export default function Home() {

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 999);
    const sphereGeometry = new SphereGeometry(2)
    const capsuleGeometry = new CapsuleGeometry(1,3) 
    const textureLoader = new TextureLoader()//will be used to load a texture to put on our 3d Sphere 
    const texture = textureLoader.load("worldImage.jpg")
    const sphereMaterial = new MeshBasicMaterial({map: texture})
    const capsuleMaterial = new MeshBasicMaterial({color: "#9371a3"})
    const worldSphere = new Mesh(sphereGeometry, sphereMaterial)
    const capsule = new Mesh(capsuleGeometry, capsuleMaterial)
    const renderer = new WebGLRenderer({antialias: true})

    camera.position.set(0, 0, 15)
    capsule.position.set(3, 0, 0)
    worldSphere.position.set(0, 0, 0)
    worldSphere.rotation.y = 0

    scene.add(worldSphere)
    scene.add(capsule)

    //setting the scene size and render the scene and camera (the renderer element will render our 3d scene into a 2d element which we gonna extract as a domElement)
    renderer.setSize(window.innerWidth, window.innerHeight)
     .render(scene, camera)

    useEffect(() => {
        document.getElementById("container").appendChild(renderer.domElement)
    }, [])

    function animate(){
        worldSphere.rotation.y += 0.005
        
        capsule.rotation.x += 0.01

        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    animate()


    return (
        <div className='flex flex-col space-y-[50px] bg-white'>
            <div id='container'></div>
            <Planet/>
        </div>
    )
}
