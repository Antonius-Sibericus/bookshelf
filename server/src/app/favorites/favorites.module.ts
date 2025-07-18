import { Module } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { FavoritesController } from './favorites.controller'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthService } from '../auth/auth.service'
import { ConfigModule } from '@nestjs/config'
import { MailService } from '../auth/authUtils/mail.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, AuthService, MailService, JwtService],
})
export class FavoritesModule {}
