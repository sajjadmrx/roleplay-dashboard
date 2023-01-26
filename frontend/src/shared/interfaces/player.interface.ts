export interface PlayerVehicle {
    status: number,
    type: string,
    parkingStatus: string,
    plate: string
}

export interface PlayerAccounts {
    money: number;
    bank: number;
    salary: number;
    black_money: number;
    tether: number;
}

export interface PlayerStatus {
    val: number;
    percent: number;
    name: string;
}

export interface PlayerMedicStatus {
    health: number;
    armor: number;
}

export interface PlayerStatusResponse {
    medState: PlayerMedicStatus
    status: PlayerStatus
}


export interface Player {
    id: number
    identifier: string
    firstname: string
    lastname: string
    phone_number: string
    group: string
    gang: string
}

export interface PlayerContext extends Partial<Player> {
    setPlayer: (player: Player) => void
    accounts: Partial<PlayerAccounts>
    setAccounts: (accounts: PlayerAccounts) => void
}