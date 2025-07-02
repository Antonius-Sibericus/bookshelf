import { Controller, Delete, Get, Param, Patch, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService
  ) { }

  @ApiOperation({
    summary: 'Получение изранного',
    description: 'Получение изранного'
  })
  @Get()
  public async getFavorites(@Req() req: Request, @Res() res: Response) {
    return await this.favoritesService.get(req, res)
  }

  @ApiOperation({
    summary: 'Добавление книги в избранное',
    description: 'Добавление книги в избранное'
  })
  @Patch(':tag')
  public async addBookToFavorites(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.favoritesService.add(req, tag, res)
  }

  @ApiOperation({
    summary: 'Удаление книги из избранного',
    description: 'Удаление книги из избранного'
  })
  @Delete(':tag')
  public async removeBookFromFavorites(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.favoritesService.remove(req, tag, res)
  }
}
