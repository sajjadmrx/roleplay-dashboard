import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

const ImportsAndExports = [
  JwtModule.register({
    secret: String(process.env.JWT_SECRET),
  }),
];

@Module({
  imports: [UsersModule, ...ImportsAndExports],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [...ImportsAndExports],
})
export class AuthModule {}
