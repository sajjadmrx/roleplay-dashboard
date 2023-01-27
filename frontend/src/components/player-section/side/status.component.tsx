import React, {useContext, useEffect, useState} from "react";
import {Progress} from "react-daisyui";
import {PlayerContext, PlayerStatusResponse} from "../../../shared/interfaces/player.interface";
import {playerContext} from "../context/player.context";
import {playerService} from "../../../service/index.service";
import {axiosError} from "../../../handlers/error.handler";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

interface PlayerStatus {
    key: string
    table: string
    value: number
    max: number
}

export function PlayerStatusComponent() {
    const playerContextData: PlayerContext = useContext<PlayerContext>(playerContext);
    const [playerStatus, setPlayerStatus] = useState<PlayerStatus[]>([
        {
            key: "health",
            table: "سلامتی",
            value: 0,
            max: 200
        },
        {
            key: "armor",
            table: "زره پوش",
            value: 0,
            max: 100
        },
        {
            key: "hunger",
            table: "گرسنگی",
            value: 0,
            max: 100
        },
        {
            key: "thirst",
            table: "تشنگی",
            value: 0,
            max: 100
        }
    ])
    const {playerId} = useParams()

    useEffect(() => {
        async function fetchPlayerStatus(playerId: string) {
            try {
                const data = await playerService.getStatus(playerId)
                playerStatus.forEach((med: PlayerStatus) => {
                    // @ts-ignore
                    let medValue = data.medState[med.key]
                    if (medValue != undefined) {
                        med.value = medValue
                        return;
                    }

                    const value = data.status.find((d) => d.name == med.key)
                    if (value) {
                        med.value = Number(value.percent.toFixed())
                    }
                })
                setPlayerStatus(playerStatus)
            } catch (e) {
                axiosError(e, toast.error)
            }
        }

        return () => {
            if (playerId)
                fetchPlayerStatus(playerId)
        }
    }, [playerContext])
    return (
        <div>
            <div dir="ltr"
                 className="w-full text-gray-300 text-sm mb-2 rounded-lg bg-gray-800 py-5">
                <div className={"grid grid-rows-4 grid-flow-col gap-4 py-2 p-3"}>
                    {playerStatus.map((status: PlayerStatus) => {
                        const color: string = 50 > status.value ? "warning" : "success"
                        return (
                            <div>
                                <p className={"text-center"}>{status.table}</p>
                                <Progress className={`progress progress-${color}`} value={status.value}
                                          max={status.max}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}