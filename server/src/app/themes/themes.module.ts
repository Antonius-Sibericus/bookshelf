import { Module } from '@nestjs/common'
import { ThemesService } from './themes.service'
import { ThemesController } from './themes.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [ThemesController],
  providers: [ThemesService, PrismaService, JwtService]
})
export class ThemesModule {}
