import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CheckPlayerIdGuard } from "../../shared/guards/check-playerId.guard";
import { PlayersService } from "./players.service";
import { getPlayer } from "../../shared/decorators/player.decorator";

@ApiTags("Players")
@ApiBearerAuth()
@UseGuards(CheckPlayerIdGuard)
@UseGuards(AuthGuard("jwt"))
@Controller("/players/:playerId")
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @ApiParam({
    name: "playerId",
    required: true,
  })
  @Get("/vehicles")
  getOwnedVehicles(@getPlayer("id") playerId: number) {
    return this.playersService.getOwnedVehicles(playerId);
  }
}
