import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { BasketsController } from './baskets.controller'
import { BasketsService } from './baskets.service'
import { MailService } from '../auth/authUtils/mail.service'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [BasketsController],
  providers: [BasketsService, PrismaService, AuthService, JwtService, MailService],
})
export class BasketsModule {}
