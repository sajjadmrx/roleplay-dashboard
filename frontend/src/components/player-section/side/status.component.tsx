import React from "react";
import {Progress} from "react-daisyui";

export class PlayerStatusComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div dir="ltr"
                     className="w-full text-gray-300 text-sm  mb-2 mt-5 rounded-lg bg-gray-800 py-5">
                    <div className={"grid grid-rows-4 grid-flow-col gap-4 py-2 p-3"}>
                        {[
                            {table: "salamti", value: 100},
                            {table: "ghaza", value: 80},
                            {table: "aab", value: 40},
                            {table: "armor", value: 0}
                        ].map((status) => {
                            const color: string = 50 > status.value ? "warning" : "success"
                            return (
                                <div>
                                    <p className={"text-center"}>{status.table}</p>
                                    <Progress className={`progress progress-${color}`} value={status.value} max={100}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}