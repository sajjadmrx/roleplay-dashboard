import axios from "axios";

const { url } = require("inspector");
import { URLSearchParams } from "url";
import {
  IErrorGetIdentity,
  IResponseGetIdentity,
  IResponseGetToken,
} from "../shared/interfaces/discord.interface";

class AuthorizationDiscord {
  private API_ENDPOINT = "https://discord.com/api/v8";
  private CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
  private CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
  private REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || "";

  async getToken(code: string): Promise<IResponseGetToken> {
    try {
      const params = new URLSearchParams();
      params.append("client_id", this.CLIENT_ID);
      params.append("client_secret", this.CLIENT_SECRET);
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", this.REDIRECT_URI);
      params.append("code", code);

      const results = await axios.post(
        `${this.API_ENDPOINT}/oauth2/token`,
        params
      );

      const response: IResponseGetToken = {
        access_token: results.data.access_token,
        expires_in: results.data.expires_in,
        refresh_token: results.data.refresh_token,
        scope: results.data.scope,
        token_type: results.data.token_type,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  getIdentify(
    access_token: string
  ): Promise<IResponseGetIdentity | IErrorGetIdentity> {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await axios.get(`${this.API_ENDPOINT}/users/@me`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const Identify = results.data as IResponseGetIdentity;
        if (!Identify) {
          throw new Error("Identify not found");
        }

        Identify.access_token = access_token;
        Identify.getFullUsername = () => {
          return `${Identify.username}#${Identify.discriminator}`;
        };

        resolve(Identify);
      } catch (error: any) {
        if (error.response.data) {
          const errorResponse = {
            code: error.response.data.code,
            message: error.response.data.message,
            tokenIsExpired: false,
          } as IErrorGetIdentity;

          if (error.response.data.code == 0) {
            errorResponse.tokenIsExpired = true;
            resolve(errorResponse);
          } else {
            resolve(errorResponse);
          }
        } else reject(error);
      }
    });
  }
}

export class UtilsAuthorizationDiscord {
  static getAvatarUrl(
    userId: string,
    avatar: string,
    size: number = 128
  ): string {
    if (!avatar) {
      return "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}?size=${size}`;
  }

  static async checkToken(token: string): Promise<boolean> {
    try {
      const result = await new AuthorizationDiscord().getIdentify(token);
      //const responseSuccess = result as IResponseGetIdentity
      const responseError = result as IErrorGetIdentity;

      if (responseError.code > -1 || responseError.tokenIsExpired) {
        return false;
      } else return true;
    } catch (error) {
      return false;
    }
  }
}

export default AuthorizationDiscord;
