import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common'
import { ThemesService } from './themes.service'
import { Response } from 'express'
import { ThemeCreateDTO } from './dto/theme-create.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ThemeUpdateDTO } from './dto/theme-update.dto'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Темы книг')
@Controller('themes')
export class ThemesController {
  constructor(
    private readonly themesService: ThemesService
  ) { }

  @ApiOperation({
    summary: 'Поиск всех тем',
    description: 'Находит и возвращает массив тем'
  })
  @Get()
  public async findAllThemes(@Res() res: Response) {
    return await this.themesService.findAll(res)
  }

  @ApiOperation({
    summary: 'Поиск темы по тэгу',
    description: 'Находит и возвращает тему по тэгу, переданному в параметры'
  })
  @Get(':tag')
  public async findCategoryByTag(@Param('tag') tag: string, @Res() res: Response) {
    return await this.themesService.findByTag(tag, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Создание темы для категории',
    description: 'Формирует запись о теме книг по названию, тэгу и тэгу категории'
  })
  @Post()
  public async createTheme(@Res() res: Response, @Body() dto: ThemeCreateDTO) {
    return await this.themesService.create(dto, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Обновление темы для категории',
    description: 'Редактирует запись о теме книг по названию, тэгу и тэгу категории'
  })
  @Put(':tag')
  public async updateTheme(@Param('tag') tag: string, @Body() dto: ThemeUpdateDTO, @Res() res: Response) {
    return await this.themesService.update(tag, dto, res)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Удаление темы',
    description: 'Удаляет запись о теме книг по тэгу'
  })
  @Delete(':tag')
  public async deleteCategory(@Param('tag') tag: string, @Res() res: Response) {
    return await this.themesService.delete(tag, res)
  }
}
