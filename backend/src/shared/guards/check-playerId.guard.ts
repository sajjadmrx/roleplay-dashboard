import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";
import { User } from "../interfaces/User.interface";
import { PlayersRepository } from "../../modules/players/players.repository";
import { getResponseMessage } from "../enums/messages.enums";
import { Player } from "../interfaces/player.interface";

@Injectable()
export class CheckPlayerIdGuard implements CanActivate {
  constructor(private playersRepository: PlayersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest<Request>();
      const user: User = req.user;
      const playerId: string | null = req.params.playerId;
      if (!playerId)
        throw new ForbiddenException(getResponseMessage("INVALID_PLAYER_ID"));

      const players: Player[] = await this.playersRepository.findWithId(
        playerId
      );

      const player: Player | undefined = players[0];
      if (!player)
        throw new ForbiddenException(getResponseMessage("INVALID_PLAYER_ID"));

      if (player.identifier != user.steamHex)
        throw new ForbiddenException(getResponseMessage("INVALID_PLAYER_ID"));

      req.player = player;

      return true;
    } catch (e) {
      throw e;
    }
  }
}
