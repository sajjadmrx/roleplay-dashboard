import {Controller, Get, UseFilters, UseGuards, UseInterceptors} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {CheckPlayerIdGuard} from "../../shared/guards/check-playerId.guard";
import {PlayersService} from "./players.service";
import {getPlayer} from "../../shared/decorators/player.decorator";
import {getUserApp} from "../../shared/decorators/user.decorator";
import {ResponseInterceptor} from "../../shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "../../shared/filters/http-exception.filter";

@ApiTags("Players")
@ApiBearerAuth()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
@UseGuards(CheckPlayerIdGuard)
@UseGuards(AuthGuard("jwt"))
@Controller("/players/:playerId")
export class PlayersController {
    constructor(private playersService: PlayersService) {
    }

    @ApiOperation({
        summary: "get player by id",
    })
    @ApiParam({
        name: "playerId",
        required: true,
    })
    @Get("/")
    getPlayer(@getPlayer() player) {
        return player
    }

    @ApiOperation({
        summary: "get Owned Vehicles",
    })
    @ApiParam({
        name: "playerId",
        required: true,
    })
    @Get("/vehicles")
    getOwnedVehicles(@getPlayer("id") playerId: number) {
        return this.playersService.getOwnedVehicles(playerId);
    }

    @ApiParam({
        name: "playerId",
        required: true,
    })
    @ApiOperation({summary: "get Owned licenses"})
    @Get("/licenses")
    getOwnedLicenses(@getPlayer("id") playerId: number) {
        return this.playersService.getOwnedLicenses(playerId)
    }


    @ApiParam({
        name: "playerId",
        required: true,
    })
    @ApiOperation({
        summary: "get player status"
    })
    @Get("/status")
    getStatus(@getPlayer("id") playerId: number, @getUserApp("steamHex") steamHex: string) {
        return this.playersService.getStatus(playerId, steamHex)
    }

    @ApiParam({
        name: "playerId",
        required: true,
    })
    @ApiOperation({
        summary: "get player accounts"
    })
    @Get("/accounts")
    getAccounts(@getPlayer("id") playerId: number, @getUserApp("steamHex") steamHex: string) {
        return this.playersService.getAccounts(playerId, steamHex)
    }

}
