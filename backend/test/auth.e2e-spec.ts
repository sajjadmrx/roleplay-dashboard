import {INestApplication} from "@nestjs/common";
import request from "supertest";
import {getApp} from "./fixtures/startapp.fixture";
import {PrismaService} from "../src/modules/prisma/prisma.service"

describe("AuthController (e2e)", () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    beforeAll(async () => {
        app = await getApp()
        prismaService = app.get<PrismaService>(PrismaService)
    });

    afterAll(() => {

    })

    it("should return steam OAuth2 url /steam (GET)", async () => {
        const response = await request(app.getHttpServer())
            .get("/v1/auth/steam")
        expect(response.statusCode).toBe(200)
        expect(response.body.data.startsWith("https://steamcommunity.com/openid/login?")).toBe(true)
    });
    it('should return jwt token /steam (POST)', async function () {
        const claimed_id: string = "https://steamcommunity.com/openid/id/76561198390033172"
        const response = await request(app.getHttpServer())
            .post("/v1/auth/steam")
            .send({claimed_id: claimed_id})
        expect(response.statusCode).toBe(201)
        expect(typeof response.body.data)
            .toBe("string")
    });

    it('should response 400 when send invalid body', async function () {
        const claimed_id: string = ""
        const response = await request(app.getHttpServer())
            .post("/v1/auth/steam")
            .send({claimed_id: claimed_id})
        expect(response.statusCode).toBe(400)
        expect(response.body.message)
            .toBe("BAD_REQUEST")
    });


});
