import { Module } from '@nestjs/common'
import { ThemesService } from './themes.service'
import { ThemesController } from './themes.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [PrismaModule],
  controllers: [ThemesController],
  providers: [ThemesService, PrismaService]
})
export class ThemesModule {}
