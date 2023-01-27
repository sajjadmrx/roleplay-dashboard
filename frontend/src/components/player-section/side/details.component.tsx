import React, {useContext, useEffect, useState} from "react";
import {Avatar, Badge} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlayerContext} from "../../../shared/interfaces/player.interface";
import {playerContext} from "../context/player.context";
import {jobsList} from "../../../shared/constants/jobs.enums";


export function DetailsComponent() {
    const playerContextData: PlayerContext = useContext<PlayerContext>(playerContext)
    let [job, setJob] = useState<any>({})
    useEffect(() => {
        if (playerContextData.job) {
            job = jobsList.find(j => j.name == playerContextData.job)
            setJob(job)
        }
    }, [playerContextData])
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
                        <FontAwesomeIcon icon={"user"}/>
                    </Badge>
                    <p className={"text-gray-50"}>
                        {playerContextData.firstname} {playerContextData.lastname}
                    </p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        <FontAwesomeIcon icon={job.icon}/>
                    </Badge>
                    <p className={"text-gray-50"}> {job?.htmlName || "بیکار"} </p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        <FontAwesomeIcon icon={"user-friends"}/>
                    </Badge>
                    <p className={"text-gray-50"}>{playerContextData.gang == "nogang" ? "No Gang" : playerContextData.gang}</p>
                </div>
                <div className={"grid grid-flow-col-dense"}>
                    <Badge color={"ghost"}>
                        <FontAwesomeIcon icon={"phone"}/>
                    </Badge>
                    <p className={"text-gray-50"}> {playerContextData.phone_number}</p>
                </div>

                <div className={"py-4 bg-gray-800 rounded"}>
                    <div className={"grid grid-cols-3 gap-3 text-center"}>
                        <div><FontAwesomeIcon icon={"car"} size={"lg"} className={"text-green-700"}/></div>
                        <div><FontAwesomeIcon icon={"ship"} size={"lg"} className={"text-red-700"}/></div>
                    </div>
                </div>
            </div>
        </div>
    )

}
