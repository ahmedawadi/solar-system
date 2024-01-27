'use client'

import { faBackward, faCaretRight, faChevronLeft, faChevronRight, faEarth, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function DescriptionStyle({planetName, planetClass, EncyclopediaTab, StructureTab, closePlanet, parentElementStyle}){
    const [opennedTab, setOpennedTab] = useState(0)//used to change the tab that can openned to see more information about a planet or the information that we can show
    return (
        <div className={parentElementStyle + " relative"}>
            <div className="nootchedCorners opacity-70 "></div>
            {
                opennedTab == 0 ? null :
                <div className="absolute z-50 left-[40px] top-[15px] flex flex-col items-center text-white hover:text-[#f2ff00] cursor-pointer" onClick={() => setOpennedTab(0)}>
                    <FontAwesomeIcon icon={planetName == "SUN" ? faSun : planetName == "EARTH" ? faEarth : faBackward} size="xl" spin />
                    <div>Back</div>
                </div>
            }
            <div className="basis-[60%] absolute z-40 flex flex-col space-y-[30px] justify-between items-center h-full w-full simpleNootchedCorners sunInfoScrollBar pb-[50px]" onMouseEnter={() => changePlanetDescBorder('white')} onMouseLeave={() => changePlanetDescBorder("#002638")}>
                <div className="basis-[20%] flex flex-col items-center text-[40px] font-mono font-black px-[20px] py-[5px]  hover:border-white">
                    <div className=" tracking-[9px]">
                    {
                        planetName
                    }
                    </div>
                    <div className="font-thin text-[18px] mt-[-10px]">
                    {
                        planetClass
                    }
                    </div>
                </div>
                {   
                    opennedTab == 0 ? 
                        <div className="flex flex-col space-y-[50px] w-full basis-[80%] justify-center">
                            <div className=" flex flex-col space-y-[10px] w-full items-center justify-center font-mono">
                                <div className="relative w-[60%] min-h-[60px] flex" >
                                    <div className="nootchedCornersButtons opacity-70" ></div>
                                    <div className="py-[7px] px-[10px] flex text-[28px] font-semibold absolute z-50 right-0 left-0 bottom-0 top-0 cursor-pointer" onClick={() => setOpennedTab(1)} onMouseEnter={() => changePlanetDescButtonsBorder('white', 0)} onMouseLeave={() => changePlanetDescButtonsBorder('#002638', 0)}>
                                        <div className="text-white basis-[90%] flex justify-center">
                                            Encyclopedia
                                        </div>
                                        <FontAwesomeIcon icon={faCaretRight} size="xl" />
                                    </div>
                                </div>
                                <div className="relative w-[60%] min-h-[60px] flex">
                                    <div className="nootchedCornersButtons opacity-70"></div>
                                    <div className="py-[7px] px-[10px] flex text-[28px] font-semibold absolute z-50 right-0 left-0 bottom-0 top-0 cursor-pointer" onClick={() => setOpennedTab(2)} onMouseEnter={() => changePlanetDescButtonsBorder('white', 1)} onMouseLeave={() => changePlanetDescButtonsBorder('#002638', 1)}>
                                        <div className="text-white basis-[90%] flex justify-center">
                                            Structure
                                        </div>
                                        <FontAwesomeIcon icon={faCaretRight} size="xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-[25px] w-full justify-center">
                                <div className="flex flex-col items-center font-semibold cursor-pointer">
                                    <div className="relative min-h-[60px] min-w-[60px] flex space-x-[3px] items-center justify-center w-fit p-[7px]  text-white text-[20px] hover:border-white border-[#002638]"  onMouseEnter={() => changeIconBorders("switchplanet", false)} onMouseLeave={() => changeIconBorders("switchplanet", true)}>
                                        <div id="switchplanet" className="nootchedCornersIcons opacity-70"></div>
                                        <div className="absolute right-0 left-0 top-0 bottom-0 z-50 p-[15px] flex justify-center items-center">
                                            <div id="switchplanet" className="flex space-x-[3px] w-fit p-[7px] text-white text-[20px]" >
                                                <FontAwesomeIcon icon={faChevronLeft} size="xl"/>
                                                <FontAwesomeIcon icon={faChevronRight} size="xl" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[20px]"  onMouseEnter={() => changeIconBorders("switchplanet", false)} onMouseLeave={() => changeIconBorders("switchplanet", true)}>
                                        switch planet
                                    </div>
                                </div>
                                <div className="flex flex-col items-center font-semibold cursor-pointer">
                                    <div  className="relative min-h-[60px] min-w-[60px] flex space-x-[3px] items-center justify-center w-fit p-[7px]  text-white text-[20px] hover:border-white border-[#002638]" onClick={closePlanet} onMouseEnter={() => changeIconBorders("viewSpace", false)} onMouseLeave={() => changeIconBorders("viewSpace", true)}>
                                        <div id="viewSpace" className="nootchedCornersIcons opacity-70"></div>
                                        <div className="absolute right-0 left-0 top-0 bottom-0 z-50 p-[15px] flex justify-center items-center">
                                            <img src="telescope.svg" className="w-full h-full"  />
                                        </div>
                                    </div>
                                    <div className="text-[20px]" id="viewSpaceButton" onClick={closePlanet} onMouseEnter={() => changeIconBorders("viewSpace", false)} onMouseLeave={() => changeIconBorders("viewSpace", true)}>
                                        view space
                                    </div>
                                </div>
                            </div>
                        </div> : opennedTab == 1 ? <EncyclopediaTab /> : <StructureTab />
                }
            </div> 
        </div>
    )
}

function changeIconBorders(iconId, addition){

    if(!addition){//mouse is over the element 
        changePlanetDescBorder('#002638')
        document.getElementById(iconId).style.backgroundColor = 'white'
    }
    else{//mouse out of the element
        changePlanetDescBorder('white')
        document.getElementById(iconId).style.backgroundColor = '#002638'
    }
        

}

function changePlanetDescBorder(color){

    const nootchedCornersList = document.getElementsByClassName("nootchedCorners")

    nootchedCornersList[0].style.backgroundColor = color        
    
}

function changePlanetDescButtonsBorder(color, planetDescButtonOrder){

    if(color == 'white')//we're leaving the button so we need to get back the border color of the info list
        changePlanetDescBorder("#002638")
    else 
        changePlanetDescBorder("white")

    const nootchedCornersButtonsList = document.getElementsByClassName("nootchedCornersButtons")

    nootchedCornersButtonsList[planetDescButtonOrder].style.backgroundColor = color 
}