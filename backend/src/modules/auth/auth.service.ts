import {getResponseMessage} from "../../shared/enums/messages.enums";
import {User} from "../../shared/interfaces/User.interface";


import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UsersRepository} from "src/modules/users/users.repository";
import {SteamIdConverter} from "../../utils/steamId.util";
import {ConfigService} from "@nestjs/config";
import {Configs} from "../../config";
import {getSteamUserProfile} from "./providers/steam.provider";

@Injectable()
export class AuthService {
    private readonly STEAM_RETURN_URL: string
    private readonly STEAM_API_KEY: string
    private readonly STEAM_REALM: string
    private JWT_SECRET: string

    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService<Configs>
    ) {
        this.STEAM_RETURN_URL = this.configService.get("STEAM_RETURN_URL")
        this.STEAM_API_KEY = this.configService.get("STEAM_API_KEY")
        this.STEAM_REALM = this.configService.get("STEAM_REALM")
        this.JWT_SECRET = this.configService.get("JWT_SECRET")
    }

    getSteamAuth(): string {
        return `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${this.STEAM_RETURN_URL}&openid.realm=${this.STEAM_REALM}&openid.ns.sreg=http://openid.net/extensions/sreg/1.1&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.assoc_handle=${this.STEAM_API_KEY}&openid.return_to=${this.STEAM_RETURN_URL}&openid.sreg.required=nickname,email,dob,fullname,timezone,language,country,avatar`;
    }

    async callbackSteamHandler(claimed_id: string | undefined): Promise<string> {
        try {
            if (!claimed_id) {
                throw new BadRequestException(getResponseMessage("BAD_REQUEST"));
            }
            const identifierRegex =
                /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;
            const regexData: RegExpExecArray | null =
                identifierRegex.exec(claimed_id);
            if (!regexData) {
                throw new BadRequestException(getResponseMessage("BAD_REQUEST"));
            }
            const steamId: string = regexData[1] as string;
            const profile = await getSteamUserProfile(this.STEAM_API_KEY, steamId);
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
            {hex: steamHex},
            {
                expiresIn: "20d",
            }
        );
    }
}

