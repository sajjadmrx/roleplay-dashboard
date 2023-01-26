import { getResponseMessage } from "../../shared/enums/messages.enums";
import { Request, Response } from "express";
import { User } from "../../shared/interfaces/User.interface";

// @ts-ignore
import SteamWebAPI from "steam-web";

import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "src/modules/users/users.repository";
import { SteamIdConverter } from "../../utils/steamId.util";

@Injectable()
export class AuthService {
  private STEAM_RETURN_URL = String(process.env.STEAM_RETURN_URL);
  private STEAM_API_KEY = String(process.env.STEAM_API_KEY);
  private STEAM_REALM = String(process.env.STEAM_REALM);
  private JWT_SECRET = String(process.env.JWT_SECRET);

  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  getSteamAuth(): string {
    return `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${this.STEAM_RETURN_URL}&openid.realm=${this.STEAM_REALM}&openid.ns.sreg=http://openid.net/extensions/sreg/1.1&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.assoc_handle=${this.STEAM_API_KEY}&openid.return_to=${this.STEAM_RETURN_URL}&openid.sreg.required=nickname,email,dob,fullname,timezone,language,country,avatar`;
  }

  async callbackSteamHandler(req: Request, res: Response): Promise<string> {
    try {
      const claimed_id: string | undefined = req.query["openid.claimed_id"] as
        | string
        | undefined;
      if (!claimed_id) {
        res.status(400);
        throw new BadRequestException(getResponseMessage("BAD_REQUEST"));
      }
      const identifierRegex =
        /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;
      const regexData: RegExpExecArray | null =
        identifierRegex.exec(claimed_id);
      if (!regexData) {
        res.status(400);
        throw new BadRequestException(getResponseMessage("BAD_REQUEST"));
      }
      const steamId: string = regexData[1] as string;
      const profile = await getUserProfile(this.STEAM_API_KEY, steamId);
      let user: User | null = await this.usersRepository.findBySteamId(steamId);
      const steamHex: string = new SteamIdConverter(steamId).getSteamHex();
      if (!user)
        user = await this.usersRepository.create({
          steamId: steamId,
          steamHex: steamHex,
          displayName: profile.displayName,
          avatar: profile.photos.full,
        });

      const token: string = await this.jwtSign(user.steamHex);
      return token;
    } catch (e) {
      throw e;
    }
  }

  private async jwtSign(steamHex: string): Promise<string> {
    return this.jwtService.signAsync(
      { hex: steamHex },
      {
        expiresIn: "20d",
      }
    );
  }
}

function getUserProfile(key: string, steamID: string): Promise<any> {
  const steam = new SteamWebAPI({ apiKey: key, format: "json" });
  return new Promise((resolve, reject) => {
    steam.getPlayerSummaries({
      steamids: [steamID],
      callback: function (err: any, result: any) {
        if (err) {
          return reject(err);
        }

        if (
          !(
            result &&
            result.response &&
            Array.isArray(result.response.players) &&
            result.response.players.length > 0
          )
        ) {
          return reject(
            new Error(
              "Malformed response while retrieving user's Steam profile information"
            )
          );
        }
        const player = result.response.players[0];
        const profile = {
          provider: "steam",
          id: player.steamid,
          displayName: player.personaname,
          real_name: player.realname,
          photos: {
            medium: player.avatarmedium,
            full: player.avatarfull,
          },
        };

        resolve(profile);
      },
    });
  });
}
