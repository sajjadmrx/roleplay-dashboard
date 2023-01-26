import {
  User,
  UserCreateInput,
  UserUpdateInput,
} from "../../shared/interfaces/User.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: UserCreateInput): Promise<User> {
    return this.prisma.users_app.create({ data: input });
  }

  async findBySteamHex(steamHex: string): Promise<User | null> {
    return this.prisma.users_app.findUnique({
      where: {
        steamHex,
      },
    });
  }

  async findBySteamId(steamId: string): Promise<User | null> {
    return this.prisma.users_app.findUnique({
      where: {
        steamId,
      },
    });
  }

  async updateBySteamId(
    steamId: string,
    input: UserUpdateInput
  ): Promise<boolean> {
    const payload = await this.prisma.users_app.updateMany({
      where: {
        steamId,
      },
      data: input,
    });
    if (payload.count > 0) return true;
    return false;
  }
}
