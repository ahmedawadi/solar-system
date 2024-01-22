'use client'

import { useEffect, useRef, useState } from "react"
import { render } from "react-dom"
import { AmbientLight, BoxGeometry, Camera, DirectionalLight, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Raycaster, Scene, ShaderMaterial, SphereGeometry, TextureLoader, Uniform, Vector2, WebGLRenderer } from "three"
import Planet from "./sun/planet"
import SunInfoList from "./sun/sunInfoList"
import { wind } from "fontawesome"
const planetAngles = Array(9).fill(0)
const planetsSpeedAroundSun = [0, 4.787, 3.502, 2.987, 2.408, 1.307, 0.968, 0.681, 0.543]
const planetsSpeedAroundItSelves = [0, 58.6, 243, 1, 1.03, 9.9, 10.7, 17.2, 16.1]
var starsAngle = 0
let globalRenderer = null//used to rerender the scene from the viewSpace function
const stars = []
var previousRotatedValue = -1
var clickedPlanetMaterial = null //planet clicked by the user to see its information 

export default function Page(){
    
    const [day, setDay] = useState(0)
    const [opennedPlanetDescription, setOpennedPlanetDescription] = useState(false)
    
    const mousePosition = new Vector2()
    const raycaster = new Raycaster()
    const canvasRef = useRef(null)
    const textureLoader = new TextureLoader()
    const camera = new PerspectiveCamera(1000, window.innerWidth/window.innerHeight, 0.1, 99999)
    const scene = new Scene()
    const sunLight = new PointLight(0xffffff, 20000);
    const sphereRadius4 = new SphereGeometry(2.2)
    const sphereRadius2 = new SphereGeometry(1.2)
    const sphereRadius2_5 = new SphereGeometry(1.45)  
    const sphereRadius1 = new SphereGeometry(0.7)
    const sphereRadius3 = new SphereGeometry(1.7)
    const sunTexture =  textureLoader.load("solarSystemImages/sun.jpg")
    const mercuryTexture = textureLoader.load("solarSystemImages/mercury.png")
    const venusTexture = textureLoader.load("solarSystemImages/venus.jpg")
    const earthTexture = textureLoader.load("solarSystemImages/earth.jpg")
    const earthBumpMap = textureLoader.load("solarSystemImages/earthBumMap.jpg")
    const earthCloud = textureLoader.load("solarSystemImages/earthCloud.jpg")
    const marsTexture = textureLoader.load("solarSystemImages/mars.jpg")
    const jupiterTexture = textureLoader.load("solarSystemImages/jupiter.jpg")
    const saturnTexture = textureLoader.load("solarSystemImages/saturn.jpg")
    const uranusTexture = textureLoader.load("solarSystemImages/uranus.jpg")
    const neptuneTexture = textureLoader.load("solarSystemImages/neptune.jpg")
    const earthCloudMesh = new Mesh(new SphereGeometry(7), new MeshStandardMaterial({map: earthCloud, opacity: 0.5}))
    const solarSystem = {
        sun: new Mesh(new SphereGeometry(22.440), new MeshBasicMaterial({map: sunTexture})), 
            mercury: new Mesh(new SphereGeometry(2.440), new MeshStandardMaterial({map: mercuryTexture})),
                venus: new Mesh(new SphereGeometry(6.052), new MeshStandardMaterial({map: venusTexture})),
                    earth: new Mesh(new SphereGeometry(6.371), new MeshStandardMaterial({map: earthTexture, bumpMap: earthBumpMap})),
                        mars: new Mesh(new SphereGeometry(3.389), new MeshStandardMaterial({map: marsTexture})),
                            jupiter: new Mesh(new SphereGeometry(20.911), new MeshStandardMaterial({map: jupiterTexture})),
                                saturn: new Mesh(new SphereGeometry(17.232), new MeshStandardMaterial({map: saturnTexture})),
                                    uranus: new Mesh(new SphereGeometry(15.362), new MeshStandardMaterial({map: uranusTexture})),
                                        neptune: new Mesh(new SphereGeometry(12.622), new MeshStandardMaterial({map: neptuneTexture})),
    }
    const viewSpaceEvent = new CustomEvent("viewSpaceClicked", {detail: solarSystem['sun']})

    solarSystem["sun"].position.set(0, 0, 0)
    solarSystem["mercury"].position.set(39, 0, 0)
    solarSystem["venus"].position.set(72, 0, 0)
    solarSystem["earth"].position.set(90, 0, 0)
    earthCloudMesh.position.set(90, 0, 0)
    solarSystem["mars"].position.set(130, 0, 0)
    solarSystem["jupiter"].position.set(180, 0, 0)
    solarSystem["saturn"].position.set(230, 0, 0)
    solarSystem["uranus"].position.set(280, 0, 0)
    solarSystem["neptune"].position.set(700, 0, 0)

    sunLight.position.set(0, 0, 0)
    camera.position.set(0, 0, 130)

    scene.add(sunLight)
    
    

    useEffect(() => {

        if(canvasRef.current){

            for(const planet of Object.values(solarSystem))
                scene.add(planet)
            
            const canvas = canvasRef.current
            const renderer = new WebGLRenderer({canvas})
            globalRenderer = renderer
            
            //stars creation
            for(let i=0; i<1000; i++){
                const star = new Mesh(new SphereGeometry(0.13), new MeshBasicMaterial({color: '#fff'}))

                stars.push({
                    star: star,
                        angle: 0
                })

                if(i<250)
                    star.position.set(Math.random() * 200, Math.random() * 200, 0)
                else if(i<500)
                    star.position.set(Math.random() * 200, -Math.random() * 200, 0)
                else if(i<750)
                    star.position.set(-Math.random() * 200, -Math.random() * 200, 0)
                else
                    star.position.set(-Math.random() * 200, Math.random() * 200, 0)

                scene.add(star)

            }

            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.render(scene, camera)

            function animate(){
                
                const solarSystemValues = Object.values(solarSystem)

                
                for(const [index, planet] of solarSystemValues.entries()){
                    
                    if(index != 0){//it is not the sun
                        planet.rotation.y += 1.35 * planetsSpeedAroundItSelves[index]
        
                        planetNextPosition(index, planet, planet.geometry.parameters.radius)
        
                        //console.log(planet.rotation.y.toFixed(2) / (2.5 * 3.14) - (planet.rotation.y.toFixed(2) / (2.5 * 3.14)).toFixed() < 0.01)
                        if(index == 3 && planet.rotation.y.toFixed(2) / (2.5 * 3.14) - (planet.rotation.y.toFixed(2) / (2.5 * 3.14)).toFixed() < 0.01 && (planet.rotation.y.toFixed(2) / (2.5 * 3.14)).toFixed() != previousRotatedValue){ //checking the passing of a day (a day pass after the rotation of the eart around itself)
                            setDay(day => day+1)
                            previousRotatedValue = (planet.rotation.y.toFixed(2) / (2.5 * 3.14)).toFixed()
                        }
                    }
                }
        
                rotateStars()
                requestAnimationFrame(animate)
                renderer.render(scene, camera)
            }
        
            animate()
        }
    }, [])    

    //addition of the functions to that will be used to check information about a planet
    useEffect(() => {
        

        if(typeof window !== 'undefined'){

            console.log('addition done')
            window.addEventListener("viewSpaceClicked", event => {
                console.log(event)
                event.detail.visible = true
            })

            window.addEventListener('click', event => {
                mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
                mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1

                raycaster.setFromCamera(mousePosition, camera)
                const intersectedObjects = raycaster.intersectObjects(scene.children)

                const solarSystemPlanets = Object.values(solarSystem)

                const selectedPlannet = intersectedObjects.find((intersectedObject) => solarSystemPlanets.includes(intersectedObject.object))
                
                if(selectedPlannet != undefined){
                    switch(selectedPlannet.object){
                        case solarSystem["sun"] : {
                            clickedPlanetMaterial = new MeshBasicMaterial({map: sunTexture})
                            solarSystem['sun'].visible = false
                        }

                    }

                    setOpennedPlanetDescription(true)
                }
            })
        
            
        }
    }, [])

    return (
        <div className="relative">
            <canvas className="w-full h-full flex relative justify-end" ref={canvasRef}></canvas>
            <div className="absolute w-[500px] h-[100px] flex items-center justify-center space-x-[10px] text-[35px] top-0 right-0 font-black text-white">
                <div className="flex space-x-[5px]">
                    {
                        Math.floor(day / 365)
                    }
                </div>
                <div className="">""</div>
                <div className="flex space-x-[5px] cursor-pointer">
                    {
                        day % 365
                    }
                </div>
            </div>
            {
                opennedPlanetDescription ?
                    <div className="absolute z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                        <div className="flex space-x-[30px] w-[80%] h-[80vh]">
                            <div className="basis-[60%] flex justify-center items-center">
                                <Planet planetMaterial={clickedPlanetMaterial} /> 
                            </div>
                            <SunInfoList viewSpaceEvent={viewSpaceEvent} parentElementStyle={"basis-[40%] relative"} />
                        </div>
                    </div> : null
            }
        </div>
    )
}

function planetNextPosition(planetIndex, planet){
    const planetDistanceFromTheSun = getDistanceFromTheSun(planet.position.x, planet.position.y)
    
    planet.position.x = Math.cos(planetAngles[planetIndex]) * planetDistanceFromTheSun
    planet.position.y = Math.sin(planetAngles[planetIndex]) * planetDistanceFromTheSun

    planetAngles[planetIndex] += (0.001 * planetsSpeedAroundSun[planetIndex])

    //planet.position.z -= 0.01
}

function rotateStars(){

    stars.forEach((star,index) => {
        const starDistanceFromTheSun = getDistanceFromTheSun(star["star"].position.z, star["star"].position.y)
        
        star["star"].position.z = Math.cos(star["angle"]) * starDistanceFromTheSun
        //star["star"].position.y = Math.sin(star["angle"]) * starDistanceFromTheSun

        star["angle"] += (0.0001 * (Math.random() * 100))

        if(index<500)
            star["star"].position.z = Math.cos(star["angle"]) * starDistanceFromTheSun
        else
            star["star"].position.z = Math.sin(star["angle"]) * starDistanceFromTheSun
    })
        

    
}

function getDistanceFromTheSun(x, y){
    return Math.sqrt((x*x) + (y*y))
}



