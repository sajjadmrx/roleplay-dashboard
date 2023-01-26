import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Request} from "express";
import {User} from "../interfaces/user.interface";
import {Player} from "../interfaces/player.interface";

export const getPlayer = createParamDecorator(
    <T extends object>(key: keyof Player, ctx: ExecutionContext): T => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const player = request["player"];
        if (key) return player[key] as unknown as T;
        else return player as T;
        // return key ? user?.[key] : (user as T);
    }
);
