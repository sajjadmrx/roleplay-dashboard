import {AxiosInstance} from "axios";
import {Response} from "../shared/interfaces/response.interface";
import {Player, PlayerAccounts, PlayerStatus, PlayerStatusResponse} from "../shared/interfaces/player.interface";

export class PlayerService {
    constructor(private myAxios: AxiosInstance) {
    }

    async getPlayer(playerId: string): Promise<Player> {
        try {
            const response = await this.myAxios.get<Response<Player>>(`v1/players/${playerId}`)
            return response.data.data
        } catch (e) {
            throw e
        }
    }

    async getStatus(playerId: string): Promise<PlayerStatusResponse> {
        try {
            const response = await this.myAxios.get<Response<PlayerStatusResponse>>(`v1/players/${playerId}/status`)
            return response.data.data
        } catch (e) {
            throw e
        }
    }

    async getAccounts(playerId: string): Promise<PlayerAccounts> {
        try {
            const response = await this.myAxios.get<Response<PlayerAccounts>>(`v1/players/${playerId}/accounts`)
            return response.data.data
        } catch (e) {
            throw e
        }
    }
}
