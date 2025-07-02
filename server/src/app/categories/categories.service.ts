import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CategoryCreateDTO } from './dto/cat-create.dto'
import type { Response } from 'express'
import { CategoryUpdateDTO } from './dto/cat-update.dto'

@Injectable()
export class CategoriesService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async findAll(res: Response) {
        try {
            const categories = await this.prismaService.category.findMany({
                select: {
                    id: true,
                    title: true,
                    tag: true,
                    themes: true
                }
            })

            if (!categories || categories.length === 0) {
                throw new NotFoundException('Ошибка при поиске категорий')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Категории найдены',
                    categories
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async findByTag(tag: string, res: Response) {
        try {
            if (!tag) {
                throw new BadRequestException('Тэг категории не найден')
            }

            const category = await this.prismaService.category.findUnique({
                where: {
                    tag
                },
                select: {
                    id: true,
                    title: true,
                    tag: true,
                    themes: true
                }
            })

            if (!category) {
                throw new NotFoundException(`Категория по тэгу ${tag} не найдена`)
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Категория найдена',
                    category
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async create(dto: CategoryCreateDTO, res: Response) {
        try {
            const { title, tag } = dto

            if (!title || !tag) {
                throw new BadRequestException(`Введены не все данные для создания категории - ${!title ? 'Название ' : '' +
                    !tag ? 'Тэг ' : ''
                    }`)
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    tag
                }
            })

            if (potentialCategory) {
                throw new ConflictException('Категория с таким тэгом уже существует')
            }

            const category = await this.prismaService.category.create({
                data: {
                    title,
                    tag
                }
            })

            if (!category) {
                throw new NotImplementedException('Не удалось создать таблицу (отношение)')
            }

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: `Категория ${title} с тэгом ${tag} успешно создана`,
                    category
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async update(tag: string, dto: CategoryUpdateDTO, res: Response) {
        try {
            const { title } = dto

            if (!tag) {
                throw new BadRequestException('Для обновления категории необходим тэг')
            }

            const oldData = await this.prismaService.category.findUnique({
                where: {
                    tag
                },
                select: {
                    title: true
                }
            })

            if (!oldData) {
                throw new NotFoundException(`Категория с тэгом ${tag} не найдена`)
            }

            const updatedCategory = await this.prismaService.category.update({
                where: {
                    tag
                },
                data: {
                    title: title ? title : oldData.title
                }
            })

            if (!updatedCategory) {
                throw new NotImplementedException('Не удалось обновить категорию')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Категория с тэгом ${tag} успешно обновлена`,
                    updatedCategory
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async delete(tag: string, res: Response) {
        try {
            if (!tag) {
                throw new BadRequestException('Для удаления информации о категории необходим тэг')
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    tag
                }
            })

            if (!potentialCategory) {
                throw new NotFoundException(`Категория по тэгу ${tag} не найдена`)
            }

            const deletedCategory = await this.prismaService.category.delete({
                where: {
                    tag
                }
            })

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Категория '${deletedCategory.title}' успешно удалена`,
                    deletedCategory
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
