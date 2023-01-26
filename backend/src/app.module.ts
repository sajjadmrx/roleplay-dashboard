import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { PlayersModule } from "./modules/players/players.module";

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PlayersModule],
})
export class AppModule {}
