import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { PublishedService } from './published.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole } from 'generated/prisma'

@ApiTags('Опубликованные пользователем книги')
@Controller('published')
export class PublishedController {
  constructor(
    private readonly publishedService: PublishedService
  ) { }

  @Roles([UserRole.ADMIN, UserRole.PUBLISHER])
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Получение опубликованного',
    description: 'Получение опубликованного'
  })
  @Get()
  public async getPublished(@Req() req: Request, @Res() res: Response) {
    return await this.publishedService.get(req, res)
  }
}
