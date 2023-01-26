import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import process from "process";
import { DocumentConfig } from "./document.config";
import { Configs } from "./config";

const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "filename",
    "Content-disposition",
    "Access-Control-Allow-Origin",
  ],
};

(async () => {
  const port = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: options,
  });

  const config = new ConfigService<Configs>();

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("/v1");

  const documentData = {
    port,
    route: "api",
  };
  if (config.get("NODE_ENV") === "development")
    new DocumentConfig(app).setupSwagger(documentData.port, documentData.route);

  await app.listen(port);

  console.log(`Server running on ${port}`);

  config.get("NODE_ENV") == "development" &&
    console.log(
      `Api Documents At: http://localhost:${documentData.port}/${documentData.route}`
    );
})();
