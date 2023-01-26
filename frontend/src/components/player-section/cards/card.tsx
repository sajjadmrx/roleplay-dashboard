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
            <div className="card border border-[#60606063] mb-0">
                <div className="card-body grid grid-cols-3 gap-4 text-center">
                    <div className={"m-auto"}>
                        {item.value}
                    </div>
                    <div className={"m-auto"}>
                        <Badge color={"ghost"}><FontAwesomeIcon icon={"dollar-sign"}/></Badge>
                    </div>
                    <div className={""}>
                        <Avatar src={item.img} size={"md"} shape={"circle"}/>
                    </div>
                    <div className={"col-start-1 col-end-3"}>{item.table}</div>
                </div>
            </div>
        </div>
    )
}