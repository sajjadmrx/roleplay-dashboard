import {Injectable} from "@nestjs/common";
import {PlayersRepository} from "./players.repository";
import {PlayerAccounts, PlayerMedicStatus, PlayerStatus} from "../../shared/interfaces/player.interface";

@Injectable()
export class PlayersService {
    constructor(private playersRepository: PlayersRepository) {
    }

    getOwnedVehicles(playerId: number) {
        return this.playersRepository.getOwnedVehicles(String(playerId));
    }

    async getOwnedLicenses(playerId: number) {
        return this.playersRepository.getOwnedLicenses(playerId)
    }

    async getStatus(playerId: number, steamHex: string) {
        try {
            const data: { status: string, medState: string } = await this.playersRepository.getStatus(playerId, steamHex)
            const status: PlayerStatus[] = JSON.parse(data.status);
            const medState: PlayerMedicStatus = JSON.parse(data.medState)
            return {
                status,
                medState: medState
            }
        } catch (e) {
            throw e
        }
    }

    async getAccounts(playerId: number, steamHex: string) {
        try {
            const data: { accounts: string } = await this.playersRepository.getAccounts(playerId, steamHex)
            const accounts: PlayerAccounts = JSON.parse(data.accounts);
            return accounts
        } catch (e) {
            throw e
        }
    }
}
