import React, {useContext, useEffect, useState} from "react";
import {Avatar, Badge, Tooltip} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlayerContext, PlayerOwnedLicenses} from "../../../shared/interfaces/player.interface";
import {playerContext} from "../context/player.context";
import {jobsList} from "../../../shared/constants/jobs.enums";
import {useParams} from "react-router-dom";
import {playerService} from "../../../service/index.service";

const assetsLicenses = [
    {
        type: "drive",
        status: 0,
        icon: "car",
        alt: "خودرو"
    },
    {
        type: "ship", status: 0, icon: "anchor", alt: "کشتی"
    },
    {
        type: "bike", status: 0, icon: "motorcycle", alt: "موتور"
    },
    {
        type: "weapon", status: 0, icon: "bomb", alt: "اسلحه"
    },
    {
        type: "xray", status: 0, icon: "helicopter", alt: "هلی کوپتر"
    }
]

export function DetailsComponent() {
    const playerContextData: PlayerContext = useContext<PlayerContext>(playerContext)
    const [licenses, setLicenses] = useState(assetsLicenses)
    let [job, setJob] = useState<any>({})
    const {playerId} = useParams()
    useEffect(() => {
        if (playerId) {
            if (playerContextData.job) {
                job = jobsList.find(j => j.name == playerContextData.job)
                setJob(job)
            }

            async function fetchOwnedLicenses() {
                const data: PlayerOwnedLicenses[] = await playerService.getOwnedLicenses(String(playerId))
                const finallyLicenses = licenses.map((lic) => {
                    const licensesValue = data.find(l => l.type == lic.type)
                    if (licensesValue) {
                        lic.status = licensesValue.status
                    }
                    return lic
                })
                setLicenses(finallyLicenses)
            }

            return () => {
                fetchOwnedLicenses()
            }
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
                <div className={""}>
                    <h1 className={"text-center text-gray-50 font-bold mb-2"}> مجوزها</h1>
                    <div className={"grid grid-cols-5 gap-3 text-center bg-gray-800 py-4 rounded "}>
                        {licenses.map((lin) => {

                            const icon: any = lin.icon;
                            const color: string = lin.status ? "text-green-700" : "text-red-700"
                            return (
                                <div>
                                    <Tooltip message={lin.alt}>
                                        <FontAwesomeIcon icon={icon} size={"lg"} className={color}/>
                                    </Tooltip>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}
