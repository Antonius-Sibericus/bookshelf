import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common'
import { BooksService } from './books.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { BookCreateDTO } from './dto/book-create.dto'
import { Request, Response } from 'express'
import { Filters } from 'src/types/filters.enum'
import { BookUpdateDTO } from './dto/book-update.dto'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService
  ) { }

  @ApiOperation({
    summary: 'Получение книг по параметрам',
    description: 'Возвращает массив книг по переданным данным'
  })
  @Get()
  public async getAllBooks(@Res() res: Response, @Query('cat') cat: string, @Query('theme') theme: string, @Query('title') title: Filters, @Query('year') year: Filters, @Query('page') page: string, @Query('search') search: string) {
    return this.booksService.findAll(res, cat, theme, title, year, page, search)
  }

  @ApiOperation({
    summary: 'Поиск книги по тэгу',
    description: 'Находит и возвращает книгу по тэгу, переданному в параметры'
  })
  @Get(':tag')
  public async findCategoryByTag(@Param('tag') tag: string, @Res() res: Response) {
    return await this.booksService.findByTag(tag, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Добавление книги',
    description: 'Формирует запись о книге по переданным данным'
  })
  @Post()
  public async createBook(@Req() req: Request, @Body() dto: BookCreateDTO, @Res() res: Response) {
    return await this.booksService.create(req, dto, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Обновление информации о книге',
    description: 'Редактирует запись о книге по переданной инфвормации'
  })
  @Put(':tag')
  public async updateTheme(@Req() req: Request, @Param('tag') tag: string, @Body() dto: BookUpdateDTO, @Res() res: Response) {
    return await this.booksService.update(req, tag, dto, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Удаление информации о книге',
    description: 'Удаляет запись о книге по тэгу'
  })
  @Delete(':tag')
  public async deleteCategory(@Req() req: Request, @Param('tag') tag: string, @Res() res: Response) {
    return await this.booksService.delete(req, tag, res)
  }
}
