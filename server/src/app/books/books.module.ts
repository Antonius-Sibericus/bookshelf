import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from '../auth/auth.service'
import { MailService } from '../auth/authUtils/mail.service'
import { FilesModule } from 'src/files/files.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, ConfigModule, FilesModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, AuthService, MailService, JwtService],
})
export class BooksModule {}
