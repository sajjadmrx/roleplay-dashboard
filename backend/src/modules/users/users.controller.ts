import {
  Controller,
  Get,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { getUserApp } from "../../shared/decorators/user.decorator";
import { User } from "../../shared/interfaces/User.interface";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { HttpExceptionFilter } from "../../shared/filters/http-exception.filter";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard("jwt"))
@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: "user profile",
  })
  @Get("/@me")
  getMe(@getUserApp() user: User) {
    return user;
  }

  @ApiOperation({
    summary: "get current user players(characters)",
  })
  @Get("/@me/players")
  getMyPlayers(@getUserApp("steamHex") steamHex: string) {
    return this.usersService.getMyPlayers(steamHex);
  }
}
