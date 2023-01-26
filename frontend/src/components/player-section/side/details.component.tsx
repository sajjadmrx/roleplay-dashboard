import React, {useContext, useState} from "react";
import {Avatar, Badge} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlayerContext} from "../../../shared/interfaces/player.interface";
import {playerContext} from "../context/player.context";

interface State {
    avatarUrl: string
}

export function DetailsComponent() {
    const playerContextData: PlayerContext = useContext<PlayerContext>(playerContext)
    return (
        <div>
            <div className={"text-center"}>
                <Avatar
                    letters={"18"}
                    className={'mb-6 '}
                    shape={"circle"}
                    size={"lg"}
                />
            </div>

            <div className="grid grid-rows-6 grid-flow-col gap-4">
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        👤
                    </Badge>
                    <p className={"text-gray-50"}>
                        {playerContextData.firstname} {playerContextData.lastname}
                    </p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>🎫</Badge>
                    <p className={"text-gray-50"}> Taxi Driver</p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>👥</Badge>
                    <p className={"text-gray-50"}>{playerContextData.gang == "nogang" ? "No Gang" : playerContextData.gang}</p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        📞
                    </Badge>
                    <p className={"text-gray-50"}> {playerContextData.phone_number}</p>
                </div>

                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        ⌚
                    </Badge>
                    <p className={"text-gray-50"}>65 h , 2 m</p>
                </div>

                <div className={"py-4 bg-gray-800 rounded"}>
                    <div className={"grid grid-cols-3 gap-3 text-center"}>
                        <div><FontAwesomeIcon icon={"car"} size={"lg"} className={"text-green-700"}/></div>
                        <div><FontAwesomeIcon icon={"ship"} size={"lg"} className={"text-red-700"}/></div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M265.2 192c25.4 0 49.8 7.1 70.8 19.9V512H144V337.7L90.4 428.3c-11.2 19-35.8 25.3-54.8 14.1s-25.3-35.8-14.1-54.8L97.7 258.8c24.5-41.4 69-66.8 117.1-66.8h50.4zM320 80c0 44.2-35.8 80-80 80s-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80zM448 0c8.8 0 16 7.2 16 16V132.3c9.6 5.5 16 15.9 16 27.7V269.3l16-5.3V208c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v84.5c0 6.9-4.4 13-10.9 15.2L480 325.3V352h48c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H484l23 92.1c2.5 10.1-5.1 19.9-15.5 19.9H432c-8.8 0-16-7.2-16-16V400H400c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32V160c0-11.8 6.4-22.2 16-27.7V32c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 16z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
