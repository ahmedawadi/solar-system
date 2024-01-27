
const sunInfo = {
    "Surface temperature" : "5,772 K",
        "Radius" : "696,340km",
            "Age" : "4.603 billion years", 
                "Gravity" : "274 m/s²", 
                    "Mass" : "1.989 × 10^30 kg",
                        "Distance to Earth" : "149.6 million km"
}

export default function SunEncyclopedia(){
    return (
        <div className="h-full overflow-auto flex flex-col space-y-[25px] px-[15px]">
            <p className="indent-8 font-mono text-[22px]">
                The Sun is the star at the center of the Solar System. It is a massive, hot ball of plasma, and it is inflated and heated by energy produced by nuclear fusion reactions at its core.
            </p>
            <div className="flex flex-col">
                {
                    Object.entries(sunInfo).map(([title, info], index) => <div key={index} className={"flex space-x-[10px]font-mono text-[22px] text-white" + (index % 2 == 0 ? " bg-[#002638]" : "")} >
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