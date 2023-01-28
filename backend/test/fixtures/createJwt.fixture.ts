import {JwtService} from "@nestjs/jwt";
import {INestApplication} from "@nestjs/common";

export async function createJwt(app: INestApplication, steamHex: string = "steam:1100001199dbb14"): Promise<string> {
    const jwtService = app.get<JwtService>(JwtService)
    return jwtService.signAsync({hex: steamHex},
        {
            expiresIn: "20d",
        })
}