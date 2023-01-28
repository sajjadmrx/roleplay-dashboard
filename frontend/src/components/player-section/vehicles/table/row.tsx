import React from "react";
import {Badge, Progress, RadialProgress, Table} from "react-daisyui";
import {PlayerVehicle} from "../../../../shared/interfaces/player.interface";

interface Prop {
    vehicle: PlayerVehicle,
    index: number
}

const garage: any = {
    "mors": "گمشده"
}
const vehicleType: any = {
    "car": "ماشین",
    "helicopter": "هلیکوپتر",
    "boat": "قایق"
}

export function PlayerVehicleRowTable(prop: Prop) {
    const {vehicle} = prop
    const inMors: boolean = garage[vehicle.garage] == garage.mors
    const status: any = JSON.parse(vehicle.vehicle)
    const fuelLevel: number = status.fuelLevel
    console.log([vehicle.type])
    return (
        <Table.Row>
            <span className={"badge badge-ghost p-4"}>{vehicle.plate}</span>
            <span>
                    {vehicleType[vehicle.type] || "ناشناخته"}
            </span>
            <span>
                   <Badge color={inMors ? "error" : "success"}
                          className={"p-3"}>  {garage[vehicle.garage] || "پارکینگ"}
                   </Badge>
            </span>
            <span>
                 <Progress value={status.vehicleHealth} max={1000} color={"primary"}/>
            </span>
            <span>
                <RadialProgress value={Number(fuelLevel.toFixed())}
                                className={""}>{fuelLevel.toFixed()}%</RadialProgress>
            </span>
        </Table.Row>
    )
}
