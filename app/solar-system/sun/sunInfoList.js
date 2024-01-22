'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { chevronCircleDown, chevronLeft, chevronRight, wind } from "fontawesome"
import { useEffect } from "react"

export default function SunInfoList({parentElementStyle, viewSpaceEvent}){

    useEffect(() => {
        if(typeof window != 'undefined' && document.getElementById("viewSpaceButton")){
            document.getElementById("viewSpaceButton").dispatchEvent(viewSpaceEvent)
            document.getElementById("viewSpaceButton").addEventListener("viewSpaceClicked", () => console.log("dispatched"))
        }    
    }, [])
    
    return (
        <div className={parentElementStyle}>
            <div className="nootchedCorners opacity-70 "></div>
            <div className="basis-[60%] absolute z-50 flex flex-col space-y-[30px] justify-between items-center h-full w-full" onMouseEnter={() => changePlanetDescBorder('white')} onMouseLeave={() => changePlanetDescBorder("#002638")}>
                <div className="basis-[20%] flex flex-col items-center text-[40px] font-mono font-black px-[20px] py-[5px]  hover:border-white">
                    <div className=" tracking-[9px]">
                        SUN
                    </div>
                    <div className="font-thin text-[18px] mt-[-10px]">
                        yellow dwarf
                    </div>
                </div>
                <div className="flex flex-col space-y-[50px] w-full basis-[80%] justify-center">
                    <div className=" flex flex-col space-y-[10px] w-full items-center justify-center font-mono">
                        <div className="relative w-[60%] min-h-[60px] flex" >
                            <div className="nootchedCornersButtons opacity-70" ></div>
                            <div className="py-[7px] px-[10px] flex text-[28px] font-semibold absolute z-50 right-0 left-0 bottom-0 top-0 cursor-pointer" onMouseEnter={() => changePlanetDescButtonsBorder('white', 0)} onMouseLeave={() => changePlanetDescButtonsBorder('#002638', 0)}>
                                <div className="text-white basis-[90%] flex justify-center">
                                    Encyclopedia
                                </div>
                                <FontAwesomeIcon icon={faCaretRight} size="xl" />
                            </div>
                        </div>
                        <div className="relative w-[60%] min-h-[60px] flex">
                            <div className="nootchedCornersButtons opacity-70"></div>
                            <div className="py-[7px] px-[10px] flex text-[28px] font-semibold absolute z-50 right-0 left-0 bottom-0 top-0 cursor-pointer" onMouseEnter={() => changePlanetDescButtonsBorder('white', 1)} onMouseLeave={() => changePlanetDescButtonsBorder('#002638', 1)}>
                                <div className="text-white basis-[90%] flex justify-center">
                                    Structure
                                </div>
                                <FontAwesomeIcon icon={faCaretRight} size="xl" />
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-[25px] w-full justify-center">
                        <div className="flex flex-col items-center font-semibold cursor-pointer">
                            <div id="switchplanet" className="flex space-x-[3px] w-fit p-[7px] border-[3px] rounded-[30px] text-white text-[20px] hover:border-white border-[#002638]" onMouseLeave={() => changePlanetDescBorder('white')} onMouseEnter={() => changePlanetDescBorder("#002638")}>
                                <FontAwesomeIcon icon={faChevronLeft} size="xl"/>
                                <FontAwesomeIcon icon={faChevronRight} size="xl" />
                            </div>
                            <div className="text-[20px]"  onMouseEnter={() => editElementStyle("switchplanet", "border-[#002638]", false)} onMouseLeave={() => editElementStyle("switchplanet", "border-[#002638]", true)}>
                                switch planet
                            </div>
                        </div>
                        <div className="flex flex-col items-center font-semibold cursor-pointer">
                            <div id="viewSpace" className="flex space-x-[3px] items-center justify-center w-fit p-[7px] border-[3px] rounded-[30px] text-white text-[20px] hover:border-white border-[#002638]" onMouseLeave={() => changePlanetDescBorder('white')} onMouseEnter={() => changePlanetDescBorder("#002638")}>
                                <img src="telescope.svg" className="text-white w-[30px] h-[30px]"  />
                            </div>
                            <div className="text-[20px]" id="viewSpaceButton" onMouseEnter={() => editElementStyle("viewSpace", "border-[#002638]", false)} onMouseLeave={() => editElementStyle("viewSpace", "border-[#002638]", true)}>
                                view space
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

function editElementStyle(elementId, elementStyle, addition){

    if(!addition){//mouse is over the element 
        changePlanetDescBorder('#002638')
        document.getElementById(elementId).classList.remove(elementStyle)
    }
    else{//mouse out of the element
        changePlanetDescBorder('white')
        document.getElementById(elementId).classList.add(elementStyle) 
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