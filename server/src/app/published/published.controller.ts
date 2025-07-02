import { Controller, Delete, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { PublishedService } from './published.service'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Опубликованные пользователем книги')
@Controller('published')
export class PublishedController {
  constructor(
    private readonly publishedService: PublishedService
  ) { }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Получение опубликованного',
    description: 'Получение опубликованного'
  })
  @Get()
  public async getPublished(@Req() req: Request, @Res() res: Response) {
    return await this.publishedService.get(req, res)
  }

  // @ApiOperation({
  //   summary: 'Добавление книги в опубликованное',
  //   description: 'Добавление книги в опубликованное'
  // })
  // @Patch(':tag')
  // public async addBookToPublished(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
  //   return await this.publishedService.add(req, tag, res)
  // }

  // @ApiOperation({
  //   summary: 'Удаление книги из опубликованного',
  //   description: 'Удаление книги из опубликованного'
  // })
  // @Delete(':tag')
  // public async removeBookFromPublished(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
  //   return await this.publishedService.remove(req, tag, res)
  // }
}
