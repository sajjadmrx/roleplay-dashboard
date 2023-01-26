import { Injectable } from "@nestjs/common";
import { PlayersRepository } from "../players/players.repository";
import { Player } from "../../shared/interfaces/player.interface";

@Injectable()
export class UsersService {
  constructor(private playersRepository: PlayersRepository) {}

  async getMyPlayers(steamHex: string): Promise<Array<Player>> {
    try {
      const players: Player[] = await this.playersRepository.findBySteamHex(
        steamHex
      );
      return players;
    } catch (e) {
      throw e;
    }
  }
}
