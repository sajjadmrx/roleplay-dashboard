import {INestApplication} from "@nestjs/common";
import request from "supertest";
import {getApp} from "./fixtures/startapp.fixture";
import {PrismaService} from "../src/modules/prisma/prisma.service"
import {createJwt} from "./fixtures/createJwt.fixture";

describe("userController (e2e)", () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let jwtToken: string
    beforeAll(async () => {
        app = await getApp()
        prismaService = app.get<PrismaService>(PrismaService)
        app.setGlobalPrefix("v1")
        jwtToken = await createJwt(app)
    });

    it('should response 200 /users/@me (Get)', async function () {
        const response = await request(app.getHttpServer())
            .get("/v1/users/@me")
            .set('Authorization', 'Bearer ' + jwtToken)
        expect(response.statusCode).toBe(200)
    });


});
