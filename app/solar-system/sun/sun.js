'use client'

import Sun3DDisplay from "./sun3DComponet"
import SunInfoList from "./sunInfoList"

export default function Sun({viewSpaceEvent, setOpennedPlanetDescription}){
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <div className="flex space-x-[30px] w-[80%] h-[80vh]">
                <div className="basis-[60%] flex justify-center items-center">
                    <Sun3DDisplay /> 
                </div>
                <SunInfoList viewSpaceEvent={viewSpaceEvent} parentElementStyle={"basis-[40%]"} setOpennedSunDescription={setOpennedPlanetDescription} />
            </div>
        </div>
    )
}