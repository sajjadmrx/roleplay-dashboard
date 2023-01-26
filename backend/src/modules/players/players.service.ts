import { Injectable } from "@nestjs/common";
import { PlayersRepository } from "./players.repository";

@Injectable()
export class PlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  getOwnedVehicles(playerId: number) {
    return this.playersRepository.getOwnedVehicles(String(playerId));
  }
}
