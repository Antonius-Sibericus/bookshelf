import { ConfigService } from "@nestjs/config";

export function isDev(configService: ConfigService): boolean {
    return configService.getOrThrow("NODE_ENV") === 'development'
}