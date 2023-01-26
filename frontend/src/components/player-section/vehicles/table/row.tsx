import React from "react";
import {Badge, Progress, Table} from "react-daisyui";
import {PlayerVehicle} from "../../../../shared/interfaces/player.interface";

interface Prop {
    vehicle: PlayerVehicle,
    index: number
}

export function PlayerVehicleRowTable(prop: Prop) {
    const {vehicle} = prop
    return (
        <Table.Row>
            <span>{prop.index}</span>
            <span>
                 <Progress value={vehicle.status} max={100} color={"warning"}/>
                </span>
            <span>
                    {vehicle.type}
                </span>
            <span>
                   <Badge color={"success"}>  {vehicle.parkingStatus} </Badge>
                </span>
            <span>{vehicle.plate}</span>
        </Table.Row>
    )
}
