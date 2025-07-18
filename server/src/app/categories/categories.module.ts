import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, JwtService]
})
export class CategoriesModule {}
