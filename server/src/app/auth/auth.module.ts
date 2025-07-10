import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaModule } from '../prisma/prisma.module'
import { MailService } from './authUtils/mail.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService]
    }),
    ConfigModule,
    PassportModule,
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, JwtStrategy, PrismaService]
})
export class AuthModule {}
