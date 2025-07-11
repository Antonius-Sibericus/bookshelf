import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { MailService } from '../auth/authUtils/mail.service'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, AuthService, JwtService, MailService],
})
export class BooksModule {}
