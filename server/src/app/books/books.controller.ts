import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation } from '@nestjs/swagger';
import { BookCreateDTO } from './dto/book-create.dto';
import { Response } from 'express';
import { Filters } from 'src/types/filters.enum';
import { BookUpdateDTO } from './dto/book-update.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiOperation({
    summary: 'Получение книг по параметрам',
    description: 'Возвращает массив книг по переданным данным'
  })
  @Get()
  public async getAllBooks(@Res() res: Response, @Query('cat') cat: string, @Query('theme') theme: string, @Query('title') title: Filters, @Query('year') year: Filters) {
    return this.booksService.findAll(res, cat, theme, title, year)
  }

  @ApiOperation({
    summary: 'Поиск книги по тэгу',
    description: 'Находит и возвращает книгу по тэгу, переданному в параметры'
  })
  @Get(':tag')
  public async findCategoryByTag(@Param('tag') tag: string, @Res() res: Response) {
    return await this.booksService.findByTag(tag, res)
  }

  @ApiOperation({
    summary: 'Добавление книги',
    description: 'Формирует запись о книге по переданным данным'
  })
  @Post()
  public async createBook(@Body() dto: BookCreateDTO, @Res() res: Response) {
    return await this.booksService.create(dto, res)
  }

  @ApiOperation({
    summary: 'Обновление информации о книге',
    description: 'Редактирует запись о книге по переданной инфвормации'
  })
  @Put(':tag')
  public async updateTheme(@Param('tag') tag: string, @Body() dto: BookUpdateDTO, @Res() res: Response) {
    return await this.booksService.update(tag, dto, res)
  }

  @ApiOperation({
    summary: 'Удаление информации о книге',
    description: 'Удаляет запись о книге по тэгу'
  })
  @Delete(':tag')
  public async deleteCategory(@Param('tag') tag: string, @Res() res: Response) {
    return await this.booksService.delete(tag, res)
  }
}
