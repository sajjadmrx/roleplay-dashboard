import React, {useContext, useEffect, useState} from "react";
import {Badge, Progress, Table} from "react-daisyui";
import {PlayerContext, PlayerVehicle} from "../../../../shared/interfaces/player.interface";
import {PlayerVehicleRowTable} from "./row";
import {playerContext} from "../../context/player.context";
import {playerService} from "../../../../service/index.service";
import {axiosError} from "../../../../handlers/error.handler";
import {toast} from "react-toastify";


export function PlayerVehiclesTable() {
    const playerContextData: PlayerContext = useContext<PlayerContext>(playerContext)
    const [vehicles, setVehicles] = useState<PlayerVehicle[]>([])
    useEffect(() => {
        if (playerContextData.id) {
            async function fetchOwnedVehicles() {
                try {
                    const vehicles = await playerService.getOwnedVehicles(String(playerContextData.id))
                    setVehicles(vehicles)
                } catch (e) {
                    axiosError(e, toast.error)
                }
            }

            return () => {
                fetchOwnedVehicles()
            }
        }
    }, [playerContextData])
    return (
        <div>
            <div className='overflow-x-auto mt-6'>
                <div className="mt-3 w-full mb-8 overflow-x-auto rounded-lg shadow-lg">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1">
                            <Table className={"w-full"}>
                                <Table.Head>
                                    <span>پلاک</span>
                                    <span>نوع</span>
                                    <span>وضعیت دسترسی</span>
                                    <span>وضعیت سلامت</span>
                                    <span>وضعیت سوخت</span>
                                </Table.Head>

                                <Table.Body>
                                    {vehicles.map((vehicle, index) => {
                                        return (
                                            <PlayerVehicleRowTable vehicle={vehicle} key={index + 1 + "S"}
                                                                   index={index + 1}/>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}