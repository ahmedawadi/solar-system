'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faChevronLeft, faChevronRight, faSun } from "@fortawesome/free-solid-svg-icons"
import { chevronCircleDown, chevronLeft, chevronRight, wind } from "fontawesome"
import { useEffect, useState } from "react"
import SunEncyclopedia from "./sunEncyclopedia"
import SunStructure from "./sunStructure"
import DescriptionStyle from "../planetDescription/descriptionStyle"

export default function SunInfoList({parentElementStyle, viewSpaceEvent, setOpennedSunDescription}){

    const closeSunInfoList = () => {

        document.dispatchEvent(viewSpaceEvent)
        setOpennedSunDescription(-1)
    }
    
    return (
        <DescriptionStyle parentElementStyle={parentElementStyle} planetName={'SUN'} planetClass={"yellow dwarf"} EncyclopediaTab={SunEncyclopedia} StructureTab={SunStructure} closePlanet={closeSunInfoList} />
    )
}
