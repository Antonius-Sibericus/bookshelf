import type { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { getSwaggerConfig } from "src/config/swagger.config";

export function setUpSwagger(app: INestApplication) {
    const config = getSwaggerConfig()
    const document = SwaggerModule.createDocument(app, config,)
    SwaggerModule.setup("/docs", app, document, {
        jsonDocumentUrl: "/swagger.json",
        yamlDocumentUrl: "/swagger.yaml",
        customSiteTitle: "Nestjs Api docs"
    })
}