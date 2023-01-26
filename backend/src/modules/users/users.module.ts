import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { PlayersModule } from "../players/players.module";
import { UsersService } from "./users.service";

const providersAndExports = [UsersRepository];

@Module({
  imports: [PlayersModule],
  controllers: [UsersController],
  providers: [...providersAndExports, UsersService],
  exports: [...providersAndExports],
})
export class UsersModule {}
