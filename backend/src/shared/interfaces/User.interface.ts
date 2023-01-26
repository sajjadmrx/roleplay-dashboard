import { Prisma, users_app } from "@prisma/client";

interface Gift {
  characterId: string;
  nextGift: Date;
  lastGift: Date;
}

export interface User extends users_app {}

export interface UserCreateInput extends Prisma.users_appCreateInput {}

export interface UserUpdateInput extends Prisma.users_appUpdateInput {}
