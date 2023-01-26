import {AxiosInstance} from "axios";
import {Response} from "../shared/interfaces/response.interface";


export class AuthService {

    constructor(protected myAxios: AxiosInstance) {
    }

    async getSteamUrl(): Promise<string> {
        try {
            const response = await this.myAxios.get<Response<string>>("/v1/auth/steam")
            return response.data.data
        } catch (error) {
            throw error;
        }
    }

    async getToken(claimed_id: string): Promise<string> {
        try {
            const response = await this.myAxios.post<Response<string>>("/v1/auth/steam", {
                claimed_id
            })
            return response.data.data
        } catch (e) {
            throw e
        }
    }
}
