import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('Bookshelf Backend - документация')
        .setDescription('Документация для backend итогового проекта Школы Программирования Esoft')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()
}