import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from '../auth/auth.service'
import { ConfigModule } from '@nestjs/config'
import { MailService } from '../auth/authUtils/mail.service'
import { JwtModule, JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService, MailService, JwtService],
})
export class UsersModule {}
