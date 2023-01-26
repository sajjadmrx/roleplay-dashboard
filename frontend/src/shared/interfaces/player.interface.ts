export interface PlayerVehicle {
    status: number,
    type: string,
    parkingStatus: string,
    plate: string
}

export interface Player {
    "id": number,
    "identifier": string,
    "firstname": string,
    "lastname": string,
    "phone_number": string,
    "group": string,
    "medState": string// "{\"health\":200,\"armor\":0}",
    "job": string,
    "gang": string,
    "vipTime": Date,
    "accounts": {
        "money": number,
        "tether": number,
        "salary": number,
        "black_money": number,
        "bank": number
    }
}