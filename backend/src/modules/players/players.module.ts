import { Module } from "@nestjs/common";
import { PlayersRepository } from "./players.repository";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";

@Module({
  controllers: [PlayersController],
  exports: [PlayersRepository],
  providers: [PlayersRepository, PlayersService],
})
export class PlayersModule {}
