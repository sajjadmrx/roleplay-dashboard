import React from "react";
import {Badge, Progress, Table} from "react-daisyui";
import {PlayerVehicle} from "../../../../shared/interfaces/player.interface";
import {PlayerVehicleRowTable} from "./row";


const playerVehicles: Array<PlayerVehicle> = [
    {
        status: 50,
        plate: "X223SDs",
        type: "خودرو",
        parkingStatus: "در دسترس"
    },
    {
        status: 89,
        plate: "X541SDs",
        type: "خودرو",
        parkingStatus: "گمشده"
    },
    {
        status: 10,
        plate: "X212SDs",
        type: "خودرو",
        parkingStatus: "گمشده"
    }
]

export function PlayerVehiclesTable() {
    return (
        <div>
            <div className='overflow-x-auto mt-6'>
                <Table className={"w-full"}>
                    <Table.Head>
                        <span/>
                        <span>وضعیت سلامت</span>
                        <span>نوع</span>
                        <span>وضعیت دسترسی</span>
                        <span>پلاک</span>
                    </Table.Head>

                    <Table.Body>
                        {playerVehicles.map((vehicle, index) => {
                            return (
                                <PlayerVehicleRowTable vehicle={vehicle} key={index + 1 + "S"} index={index + 1}/>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}