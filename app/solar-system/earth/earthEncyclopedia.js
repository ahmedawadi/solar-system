
const earthInfo = {
    "Surface temperature" : "59 degrees",
        "Radius" : "6,371 km",
            "Age" : "4.543 billion years", 
                "Gravity" : "9.807 m/s²", 
                    "Mass" : "5.972 × 10^24 kg",
                        "Distance to sun" : "149.6 million km",
                            "Land area" : "148.9 million km²",
                                "Surface area" : "510.1 million km²",
                                    "Water percentage" : "71%",
                                        "Land percentage" : "29%"

}

export default function EarthEncyclopedia(){
    return (
        <div className="h-full overflow-auto flex flex-col space-y-[25px] px-[15px]">
            <p className="indent-8 font-mono text-[22px]">
                Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by Earth being a water world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's water is contained in its global ocean, covering 70.8% of Earth's crust.            </p>
            <div className="flex flex-col">
                {
                    Object.entries(earthInfo).map(([title, info], index) => <div key={index} className={"flex space-x-[10px]font-mono text-[22px] text-white" + (index % 2 == 0 ? " bg-[#002638]" : "")} >
                        <div className="basis-[40%] font-bold flex itmes-center">
                            {
                                title
                            }
                        </div>
                        <div className="basis-[60%] flex items-center">
                            {
                                info
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}