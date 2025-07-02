import { Controller, Delete, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { FavoritesService } from './favorites.service'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Избранное пользователя')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService
  ) { }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Получение изранного',
    description: 'Получение изранного'
  })
  @Get()
  public async getFavorites(@Req() req: Request, @Res() res: Response) {
    return await this.favoritesService.get(req, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Добавление книги в избранное',
    description: 'Добавление книги в избранное'
  })
  @Patch(':tag')
  public async addBookToFavorites(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.favoritesService.add(req, tag, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Удаление книги из избранного',
    description: 'Удаление книги из избранного'
  })
  @Delete(':tag')
  public async removeBookFromFavorites(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.favoritesService.remove(req, tag, res)
  }
}
