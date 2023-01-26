import {createContext} from "react";
import {Player, PlayerAccounts, PlayerContext} from "../../../shared/interfaces/player.interface";

export const playerContext = createContext<PlayerContext>({
    firstname: undefined,
    group: undefined,
    gang: undefined,
    lastname: undefined,
    identifier: undefined,
    phone_number: undefined,
    id: undefined,
    accounts: {},
    setAccounts: (accounts) => {
    },
    setPlayer: (player: Player) => {
    }
})