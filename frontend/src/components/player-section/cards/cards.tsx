import React from "react";
import {Avatar, Badge} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlayerCard} from "./card";

const items = [
    {
        table: "پول نقد",
        value: 1000,
        img: "/assets/status/money.png"
    },
    {
        table: "حساب بانکی",
        value: 1000,
        img: "/assets/status/bank.png"
    },
    {
        table: "IRWorld کوین",
        value: 12,
        img: "/assets/status/irwCoin.png"
    }
]

export function PlayerCardsComponent() {
    return (
        <div>
            <div className="grid  lg:grid-cols-3 gap-3">
                {items.map((item) => {
                    return (
                        <PlayerCard item={item}/>
                    )
                })}
            </div>
        </div>
    )
}