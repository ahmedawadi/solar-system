'use client'

import DescriptionStyle from "../planetDescription/descriptionStyle"
import EarthEncyclopedia from "./earthEncyclopedia"
import EarthStructure from "./earthStructure"

export default function EarthInfoList({parentElementStyle, setOpennedSunDescription, viewSpaceEvent}){

    const closeEarthInfoList = () => {

        document.dispatchEvent(viewSpaceEvent)
        setOpennedSunDescription(-1)
    }

    return (
        <DescriptionStyle planetName={"EARTH"} planetClass={"terrestrial planet"} parentElementStyle={parentElementStyle} StructureTab={EarthStructure} EncyclopediaTab={EarthEncyclopedia} closePlanet={closeEarthInfoList} />
    )
}