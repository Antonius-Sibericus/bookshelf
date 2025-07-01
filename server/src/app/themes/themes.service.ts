import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ThemeCreateDTO } from './dto/theme-create.dto'
import { Response } from 'express'
import { ThemeUpdateDTO } from './dto/theme-update.dto'

@Injectable()
export class ThemesService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async findAll(res: Response) {
        try {
            const themes = await this.prismaService.theme.findMany({
                select: {
                    id: true,
                    title: true,
                    tag: true,
                    category: true
                }
            })

            if (!themes || themes.length === 0) {
                throw new NotFoundException('Ошибка при поиске тем')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Темы найдены',
                    themes
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async findByTag(tag: string, res: Response) {
        try {
            if (!tag) {
                throw new BadRequestException('Тэг темы не найден')
            }

            const theme = await this.prismaService.theme.findUnique({
                where: {
                    tag
                },
                select: {
                    id: true,
                    title: true,
                    tag: true,
                    category: true
                }
            })

            if (!theme) {
                throw new NotFoundException(`Тема по тэгу ${tag} не найдена`)
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Тема найдена',
                    theme
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async create(dto: ThemeCreateDTO, res: Response) {
        try {
            const { title, tag, categoryId } = dto

            if (!title || !tag) {
                throw new BadRequestException(`Введены не все данные для создания темы - ${!title ? 'Название ' : '' +
                    !tag ? 'Тэг ' : '' +
                        !categoryId ? 'ID категории ' : ''
                    }`)
            }

            const potentialTheme = await this.prismaService.theme.findUnique({
                where: {
                    tag
                }
            })

            if (potentialTheme) {
                throw new ConflictException('Тема с таким тэгом уже существует')
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    id: categoryId
                }
            })

            if (!potentialCategory) {
                throw new BadRequestException(`Категории с ID ${categoryId} не существует`)
            }

            const theme = await this.prismaService.theme.create({
                data: {
                    title,
                    tag,
                    categoryId
                }
            })

            if (!theme) {
                throw new NotImplementedException('Не удалось создать таблицу (отношение)')
            }

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: `Тема ${title} с тэгом ${tag} категории ${categoryId} успешно создана`,
                    theme
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }

    }

    public async update(tag: string, dto: ThemeUpdateDTO, res: Response) {
        try {
            const { title, categoryId } = dto

            if (!tag) {
                throw new BadRequestException('Для обновления темы необходим тэг')
            }


            const oldData = await this.prismaService.theme.findUnique({
                where: {
                    tag
                },
                select: {
                    title: true,
                    categoryId: true
                }
            })

            if (!oldData) {
                throw new NotFoundException(`Тема с тэгом ${tag} не найдена`)
            }

            const updatedTheme = await this.prismaService.theme.update({
                where: {
                    tag
                },
                data: {
                    title: title ? title : oldData.title,
                    categoryId: categoryId ? categoryId : oldData.categoryId
                }
            })

            if (!updatedTheme) {
                throw new NotImplementedException('Не удалось обновить тему')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Тема с тэгом ${tag} успешно обновлена`,
                    updatedTheme
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async delete(tag: string, res: Response) {
        try {
            const potentialTheme = await this.prismaService.theme.findUnique({
                where: {
                    tag
                }
            })

            if (!potentialTheme) {
                throw new NotFoundException(`Тема по тэгу ${tag} не найдена`)
            }

            const deletedTheme = await this.prismaService.theme.delete({
                where: {
                    tag
                }
            })

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Тема '${deletedTheme.title}' успешно удалена`,
                    deletedTheme
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
