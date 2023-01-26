import { Request, Response } from "express";

import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { HttpExceptionFilter } from "../../shared/filters/http-exception.filter";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/steam")
  steam() {
    return this.authService.getSteamAuth();
  }

  @Get("/callback/steam")
  async steamReceivedData(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.callbackSteamHandler(req, res);
  }
}
