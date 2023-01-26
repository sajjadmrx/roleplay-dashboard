import {Player} from "../../shared/interfaces/player.interface";
import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {OwnedVehicles} from "./interfaces/vehicles.interface";

@Injectable()
export class PlayersRepository {
    constructor(private prisma: PrismaService) {
    }

    findBySteamHex(steamHex: string): Promise<Player[]> {
        return this.prisma.users.findMany({
            where: {
                identifier: steamHex,
            },
            select: {
                id: true,
                identifier: true,
                lastname: true,
                phone_number: true,
                group: true,
                gang: true
            }
        });
    }

    async findOne(playerId: number, steamHex: string): Promise<Player | null> {
        return this.prisma.users.findUnique({
            where: {
                identifier_id: {
                    id: playerId,
                    identifier: steamHex
                }
            },
            select: {
                id: true,
                identifier: true,
                lastname: true,
                phone_number: true,
                group: true,
                gang: true
            }
        });
    }

    async getSlotsPlayers(steamHex: string): Promise<number> {
        const slot: any[] = await this.prisma.character_slots.findMany({
            where: {steamhex: steamHex},
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

    getOwnedLicenses(playerId: number) {
        return this.prisma.user_licenses.findMany({
            where: {
                owner: playerId.toString()
            }
        })
    }

    getStatus(player: number, steamHex: string): Promise<{ status: string, medState: string }> {
        return this.prisma.users.findUnique({
            where: {
                identifier_id: {
                    id: player,
                    identifier: steamHex
                }
            },
            select: {
                status: true,
                medState: true
            }
        })
    }

    getAccounts(player: number, steamHex: string): Promise<{ accounts: string }> {
        return this.prisma.users.findUnique({
            where: {
                identifier_id: {
                    id: player,
                    identifier: steamHex
                }
            },
            select: {
                accounts: true
            }
        })
    }
}
