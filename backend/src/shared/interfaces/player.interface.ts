import {Prisma, users} from "@prisma/client";

export interface PlayerAccounts {
    money: number;
    bank: number;
    salary: number;
    black_money: number;
    tether: number;
}

export interface PlayerStatus {
    val: number;
    percent: number;
    name: string;
}

export interface PlayerMedicStatus {
    health: number;
    armor: number;
}

export interface PlayerFullData extends users {
}

type player = "id" | "identifier" | "lastname" | "phone_number" | "group" | "gang"

export interface Player extends Pick<PlayerFullData, player> {
}