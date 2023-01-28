import React from "react";
import {Avatar, Badge} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Prop {
    item: {
        value: number,
        table: string,
        img: string
    }
}

export function PlayerCard(prop: Prop) {
    const {item} = prop
    return (
        <div>
            <div className="card border  border-[#60606063] rounded-lg hover:top-0.5 hover:cursor-pointer mb-0 h-20">
                <div className="grid grid-rows-3 grid-flow-col gap-4 text-center">
                    <div className={"mt-2"}>{item.table}</div>
                    <div className={"row-start-2 row-span-3"} dir={"auto"}>$ {item.value.toLocaleString('en-US')}</div>
                    <div className={"absolute top-1 left-2"}>
                        <Avatar src={item.img} size={"xs"} shape={"circle"}/>
                    </div>

                </div>
            </div>
        </div>
    )
}