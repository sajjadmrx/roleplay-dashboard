import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User } from "../interfaces/user.interface";

export const getUserApp = createParamDecorator(
  <T>(key: keyof User, ctx: ExecutionContext): T => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request["user"];
    if (key) return user[key] as T;
    else return user as T;
  }
);
