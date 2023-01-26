import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class DocumentConfig {
  constructor(private app: INestApplication) {}

  setupSwagger(port: number, route: string): this {
    const config = new DocumentBuilder()
      .setTitle("IRWorld App API")
      .setDescription("The IRWorld App API description")
      .setVersion("1.0")
      .addBearerAuth({
        type: "http",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      })
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(route, this.app, document); //It only works on development mode
    return this;
  }
}
