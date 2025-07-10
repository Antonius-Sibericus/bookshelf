import { Module } from '@nestjs/common'
import { PublishedService } from './published.service'
import { PublishedController } from './published.controller'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { MailService } from '../auth/authUtils/mail.service'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [PublishedController],
  providers: [PublishedService, PrismaService, AuthService, JwtService, MailService]
})
export class PublishedModule {}
