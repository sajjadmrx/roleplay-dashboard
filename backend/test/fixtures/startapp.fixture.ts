import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";
import {INestApplication} from "@nestjs/common";

export async function getApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("/v1")
    await app.init();
    return app
}