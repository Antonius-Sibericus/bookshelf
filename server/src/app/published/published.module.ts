import { Module } from '@nestjs/common';
import { PublishedService } from './published.service';
import { PublishedController } from './published.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [PublishedController],
  providers: [PublishedService, PrismaService, AuthService, JwtService]
})
export class PublishedModule {}
