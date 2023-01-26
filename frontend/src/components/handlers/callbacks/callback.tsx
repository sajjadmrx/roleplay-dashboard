import React from "react";

export function CallbackAuthHandlerComponent(request: any) {
    const {match} = request
    const {params} = match
    console.log(match)
    return <div>h</div>
}