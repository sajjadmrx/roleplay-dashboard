import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "../../users/users.repository";
import * as process from "process";
import { User } from "src/shared/interfaces/User.interface";
import { getResponseMessage } from "../../../shared/enums/messages.enums";

interface payload {
  hex: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: payload) {
    try {
      if (!payload.hex)
        throw new UnauthorizedException(getResponseMessage("UNAUTHORIZED"));

      const user: User | null = await this.usersRepository.findBySteamHex(
        payload.hex
      );
      if (!user)
        throw new UnauthorizedException(getResponseMessage("UNAUTHORIZED"));

      return user;
    } catch (e) {
      throw e;
    }
  }
}
