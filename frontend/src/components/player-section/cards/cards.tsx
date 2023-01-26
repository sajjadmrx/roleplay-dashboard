import React, {useContext, useEffect, useState} from "react";
import {Avatar, Badge} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlayerCard} from "./card";
import {playerContext} from "../context/player.context";
import {PlayerContext} from "../../../shared/interfaces/player.interface";


export function PlayerCardsComponent() {
    const [items, setItems] = useState([
        {
            key: "money",
            table: "پول نقد",
            value: 0,
            img: "/assets/status/money.png"
        },
        {
            key: "bank",
            table: "حساب بانکی",
            value: 0,
            img: "/assets/status/bank.png"
        },
        {
            key: "black_money",
            table: "IRWorld کوین",
            value: 0,
            img: "/assets/status/irwCoin.png"
        },
    ])
    const player: PlayerContext = useContext(playerContext)
    useEffect(() => {
        if (!player || player.accounts.bank != undefined) {
            const _items: { key: string; table: string; value: number; img: string; }[] = []
            items.forEach((item) => {
                // @ts-ignore
                const acc = player.accounts[item.key]
                if (acc != undefined) {
                    item.value = acc
                    _items.push(item)
                }
            })
            setItems([..._items as any])
        }
    }, [player])
    return (
        <div>
            <div className={`grid  lg:grid-cols-3 gap-1 container`}>
                {items.map((item) => {
                    return <PlayerCard item={item}/>
                })}
            </div>
        </div>
    )
}