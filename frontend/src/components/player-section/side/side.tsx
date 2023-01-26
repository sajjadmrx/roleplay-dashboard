import React from "react";
import {DetailsComponent} from "./details.component";
import {PlayerStatusComponent} from "./status.component";


export class PlayerSideSectionComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div className="flex flex-col justify-center sticky top-8 lg:w-[260px]" dir={"ltr"}>
                    <DetailsComponent/>
                    <PlayerStatusComponent/>
                </div>
            </div>
        )
    }
}