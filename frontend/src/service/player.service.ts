import {User} from "../shared/interfaces/user.interface";
import {AxiosInstance} from "axios";
import {Response} from "../shared/interfaces/response.interface";
import {Player} from "../shared/interfaces/player.interface";

export class UserService {
    constructor(private myAxios: AxiosInstance) {
    }

    async getProfile(): Promise<User> {
        try {
            const response = await this.myAxios.get<Response<User>>("v1/users/@me")
            return response.data.data
        } catch (e) {
            throw e
        }
    }

    async getPlayers(): Promise<Array<Player>> {
        try {
            const response = await this.myAxios.get<Response<Player[]>>("v1/users/@me/players")
            return response.data.data
        } catch (e) {
            throw e
        }
    }
}
