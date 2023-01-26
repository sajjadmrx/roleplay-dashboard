import { Player } from "../../shared/interfaces/player.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OwnedVehicles } from "./interfaces/vehicles.interface";

@Injectable()
export class PlayersRepository {
  constructor(private prisma: PrismaService) {}

  findBySteamHex(steamHex: string): Promise<Player[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const playersData = await this.prisma.users.findMany({
          where: {
            identifier: steamHex,
          },
        });
        const players = playersData.map((p) => new Player(p));
        resolve(players);
      } catch (e) {
        reject(e);
      }
    });
  }

  async findWithId(id: string): Promise<Player[] | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const playersData = await this.prisma.users.findMany({
          where: {
            id: Number(id),
          },
        });
        const players = playersData.map((p) => new Player(p));
        resolve(players);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getSlotsPlayers(steamHex: string): Promise<number> {
    const slot: any[] = await this.prisma.character_slots.findMany({
      where: { steamhex: steamHex },
    }); //.$queryRawUnsafe(`SELECT slots FROM character_slots WHERE steamhex = "${steamhex}"`)
    if (slot.length > 0) {
      return slot[0].slots;
    }
    return 0;
  }

  getOwnedVehicles(playerId: string): Promise<Array<OwnedVehicles>> {
    return this.prisma.owned_vehicles.findMany({
      where: {
        owner: playerId,
      },
      select: {
        vehicleId: true,
        vehicle: true,
        stored: true,
        garage_name: true,
        vehiclename: true,
        plate: true,
        type: true,
        garage: true,
      },
    });
  }
}
