import { Body, Controller, Post, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiOperation } from '@nestjs/swagger';
import { BookCreateDTO } from './dto/book-create.dto';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({
    summary: 'Добавление книги',
    description: 'Формирует запись о книге по переданным данным'
  })
  @Post()
  public async createBook(@Body() dto: BookCreateDTO, @Res() res: Response) {
    return await this.booksService.create(dto, res)
  }
}
