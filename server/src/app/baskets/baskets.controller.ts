import { Controller, Delete, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { BasketsService } from './baskets.service'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Корзина пользователя')
@Controller('basket')
export class BasketsController {
  constructor(
    private readonly basketsService: BasketsService
  ) { }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Получение корзины',
    description: 'Получение корзины'
  })
  @Get()
  public async getBasket(@Req() req: Request, @Res() res: Response) {
    return await this.basketsService.get(req, res)
  }
  
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Добавление книги в корзину',
    description: 'Добавление книги в корзину'
  })
  @Patch(':tag')
  public async addBookToBasket(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.basketsService.add(req, tag, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Удаление книги из корзины',
    description: 'Удаление книги из корзины'
  })
  @Delete(':tag')
  public async removeBookFromBasket(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.basketsService.remove(req, tag, res)
  }
}
