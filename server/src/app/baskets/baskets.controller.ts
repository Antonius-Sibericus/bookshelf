import { Controller, Delete, Get, Param, Patch, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BasketsService } from './baskets.service';

@Controller('basket')
export class BasketsController {
  constructor(
    private readonly basketsService: BasketsService
  ) { }

  @ApiOperation({
    summary: 'Получение корзины',
    description: 'Получение корзины'
  })
  @Get()
  public async getBasket(@Req() req: Request, @Res() res: Response) {
    return await this.basketsService.get(req, res)
  }

  @ApiOperation({
    summary: 'Добавление книги в корзину',
    description: 'Добавление книги в корзину'
  })
  @Patch(':tag')
  public async addBookToBasket(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.basketsService.add(req, tag, res)
  }

  @ApiOperation({
    summary: 'Удаление книги из корзины',
    description: 'Удаление книги из корзины'
  })
  @Delete(':tag')
  public async removeBookFromBasket(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.basketsService.remove(req, tag, res)
  }
}
