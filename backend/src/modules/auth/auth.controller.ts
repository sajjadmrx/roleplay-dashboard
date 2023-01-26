import {
    Body,
    Controller,
    Get, Post,
    UseFilters,
    UseInterceptors,
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ResponseInterceptor} from "../../shared/interceptors/response.interceptor";
import {HttpExceptionFilter} from "../../shared/filters/http-exception.filter";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("Auth")
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Get("/steam")
    steam() {
        return this.authService.getSteamAuth();
    }

    @ApiOperation({
        summary: "create/get json web token with claimed_id"
    })
    @ApiBody({
        schema: {
            example: {
                claimed_id: "https://steam..../1-9"
            }
        }
    })
    @Post("/steam")
    async steamReceivedData(
        @Body("claimed_id") claimed_id: string
    ) {
        return this.authService.callbackSteamHandler(claimed_id);
    }
}
