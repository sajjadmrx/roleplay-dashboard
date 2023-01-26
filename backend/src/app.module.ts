import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { PlayersModule } from "./modules/players/players.module";
import { ConfigModule } from "@nestjs/config";
import Config from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    PlayersModule,
  ],
})
export class AppModule {}
