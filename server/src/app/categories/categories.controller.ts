import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { Response } from 'express'
import { CategoryCreateDTO } from './dto/cat-create.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CategoryUpdateDTO } from './dto/cat-update.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole } from 'generated/prisma'

@ApiTags('Категории книг')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) { }

  @ApiOperation({
    summary: 'Поиск всех категорий',
    description: 'Находит и возвращает массив категорий'
  })
  @Get()
  public async findAllCategories(@Res() res: Response) {
    return await this.categoriesService.findAll(res)
  }

  @ApiOperation({
    summary: 'Поиск категории по тэгу',
    description: 'Находит и возвращает категорию по тэгу, переданному в параметры'
  })
  @Get(':tag')
  public async findCategoryByTag(@Param('tag') tag: string, @Res() res: Response) {
    return await this.categoriesService.findByTag(tag, res)
  }

  @Roles([UserRole.ADMIN, UserRole.PUBLISHER])
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Создание категории',
    description: 'Формирует запись о категории книг по названию и тэгу'
  })
  @Post()
  public async createCategory(@Res() res: Response, @Body() dto: CategoryCreateDTO) {
    return await this.categoriesService.create(dto, res)
  }

  @Roles([UserRole.ADMIN, UserRole.PUBLISHER])
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Обновление категории',
    description: 'Редактирует запись о категории книг по названию и тэгу'
  })
  @Put(':tag')
  public async updateCategory(@Param('tag') tag: string, @Res() res: Response, @Body() dto: CategoryUpdateDTO) {
    return await this.categoriesService.update(tag, dto, res)
  }

  @Roles([UserRole.ADMIN, UserRole.PUBLISHER])
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Удаление категории',
    description: 'Удаляет запись о категории книг по тэгу'
  })
  @Delete(':tag')
  public async deleteCategory(@Param('tag') tag: string, @Res() res: Response) {
    return await this.categoriesService.delete(tag, res)
  }
}
