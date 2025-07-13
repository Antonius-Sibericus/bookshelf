import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { BookCreateDTO } from './dto/book-create.dto'
import { Request, Response } from 'express'
import { Filters } from 'src/types/filters.enum'
import { BookUpdateDTO } from './dto/book-update.dto'
import { JwtPayload } from 'src/types/jwt.interface'
import { JwtService } from '@nestjs/jwt'
import { UserRoles } from 'src/types/user-roles.enum'

@Injectable()
export class BooksService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    public async findAll(res: Response, cat: string, theme: string, title: Filters, year: Filters, search: string, page: string) {
        try {
            const books = await this.prismaService.book.findMany({
                skip: 6 * (+page - 1),
                take: 6,
                where: {
                    categoryTag: {
                        contains: cat ? cat : ''
                    },
                    themeTag: {
                        contains: theme ? theme : ''
                    },
                    heading: {
                        contains: search ? search : ''
                    }
                },
                select: {
                    heading: true,
                    tag: true,
                    author: true,
                    description: true,
                    pages: true,
                    isInStock: true,
                    year: true,
                    isbn: true,
                    isSoftCover: true,
                    publisherId: true,
                    categoryTag: true,
                    themeTag: true
                },
                orderBy: [
                    title ? {
                        heading: title === Filters.ASC ? 'asc' : title === Filters.DESC ? 'desc' : 'asc'
                    } : {},
                    year ? {
                        year: year === Filters.ASC ? 'asc' : year === Filters.DESC ? 'desc' : 'asc'
                    } : {}
                ]
            })

            if (!books) {
                throw new NotFoundException('Поиск книг не дал результатов')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Книги найдены',
                    books
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async findByTag(tag: string, res: Response) {
        try {
            if (!tag) {
                throw new BadRequestException('Тэг книги не найден')
            }

            const book = await this.prismaService.book.findUnique({
                where: {
                    tag
                }
            })

            if (!book) {
                throw new NotFoundException(`Книга по тэгу ${tag} не найдена`)
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Книга найдена',
                    book
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async create(req: Request, dto: BookCreateDTO, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }
            
            const potentialPublished = await this.prismaService.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    role: true
                }
            })

            if (!potentialPublished || potentialPublished.role === UserRoles.READER) {
                throw new NotFoundException('Такой пользователь не может опубликовать книгу или отредактировать информацию о ней, необходимо обладать правами администратора или публикатора')
            }

            const { heading, tag, author, description, pages, isInStock, year, isbn, isSoftCover, categoryTag, themeTag } = dto

            if (!heading || !tag || !author || !description || !pages || isInStock === undefined || !year || !isbn || isSoftCover === undefined || !categoryTag || !themeTag) {
                throw new BadRequestException(`Введены не все данные для создания книги - ${!heading ? 'Название ' : '' +
                    !tag ? 'Тэг ' : '' +
                        !author ? 'Автор ' : '' +
                            !description ? 'Описание ' : '' +
                                !pages ? 'Страницы' : '' +
                                    isInStock === undefined ? 'В наличии ' : '' +
                                        !year ? 'Год ' : '' +
                                            !isbn ? 'ISBN ' : '' +
                                                isSoftCover === undefined ? 'Тип обложки ' : '' +
                                                    !categoryTag ? 'Категория ' : '' +
                                                        !themeTag ? 'Тема ' : ''
                    }`)
            }

            const potentialBook = await this.prismaService.book.findUnique({
                where: {
                    tag
                }
            })

            if (potentialBook) {
                throw new ConflictException('Книга с таким тэгом уже существует')
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    tag: categoryTag
                }
            })

            if (!potentialCategory) {
                throw new NotFoundException(`Категории с тэгом ${categoryTag} не существует`)
            }

            const potentialTheme = await this.prismaService.theme.findUnique({
                where: {
                    tag: themeTag
                }
            })

            if (!potentialTheme) {
                throw new NotFoundException(`Темы с тэгом ${themeTag} не существует`)
            }

            const book = await this.prismaService.book.create({
                data: {
                    heading,
                    tag,
                    author,
                    description,
                    pages,
                    isInStock,
                    year,
                    isbn,
                    isSoftCover,
                    publisherId: userId,
                    categoryTag,
                    themeTag
                }
            })

            if (!book) {
                throw new NotImplementedException('Не удалось создать таблицу (отношение)')
            }

            const updatedPublished = await this.prismaService.published.update({
                where: {
                    userId
                },
                data: {
                    books: {
                        connect: {
                            tag: book.tag
                        }
                    }
                }
            })

            if (!updatedPublished) { throw new NotImplementedException('Не удалось обновить опубликованное') }

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: `Книга ${heading} категории ${categoryTag} темы ${themeTag} успешно создана`,
                    book
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async update(req: Request, tag: string, dto: BookUpdateDTO, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }
            
            const potentialPublished = await this.prismaService.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    role: true
                }
            })

            if (!potentialPublished || potentialPublished.role === UserRoles.READER) {
                throw new NotFoundException('Такой пользователь не может опубликовать книгу или отредактировать информацию о ней, необходимо обладать правами администратора или публикатора')
            }

            const { heading, author, description, pages, isInStock, year, isbn, isSoftCover, categoryTag, themeTag } = dto

            if (!tag) {
                throw new BadRequestException('Для обновления информации о книге необходим тэг')
            }

            const oldData = await this.prismaService.book.findUnique({
                where: {
                    tag
                },
                select: {
                    heading: true,
                    author: true,
                    description: true,
                    pages: true,
                    isInStock: true,
                    year: true,
                    isbn: true,
                    isSoftCover: true,
                    categoryTag: true,
                    themeTag: true,
                    publisherId: true
                }
            })

            if (!oldData) {
                throw new NotFoundException(`Книга с тэгом ${tag} не найдена`)
            }

            if (userId !== oldData.publisherId) {
                throw new UnauthorizedException('Только публикатор книги может редактировать информацию о ней')
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    tag: categoryTag
                }
            })

            if (!potentialCategory) {
                throw new NotFoundException(`Категории с тэгом ${categoryTag} не существует`)
            }

            const potentialTheme = await this.prismaService.theme.findUnique({
                where: {
                    tag: themeTag
                }
            })

            if (!potentialTheme) {
                throw new NotFoundException(`Темы с тэгом ${themeTag} не существует`)
            }

            const updatedBook = await this.prismaService.book.update({
                where: {
                    tag
                },
                data: {
                    heading: heading ? heading : oldData.heading,
                    author: author ? author : oldData.author,
                    description: description ? description : oldData.description,
                    pages: pages ? pages : oldData.pages,
                    isInStock: isInStock !== undefined ? isInStock : oldData.isInStock,
                    year: year ? year : oldData.year,
                    isbn: isbn ? isbn : oldData.isbn,
                    isSoftCover: isSoftCover !== undefined ? isSoftCover : oldData.isSoftCover,
                    categoryTag: categoryTag ? categoryTag : oldData.categoryTag,
                    themeTag: themeTag ? themeTag : oldData.themeTag
                }
            })

            if (!updatedBook) {
                throw new NotImplementedException('Не удалось обновить книгу')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Книга с тэгом ${tag} успешно обновлена`,
                    updatedBook
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async delete(req: Request, tag: string, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }
            
            const potentialPublished = await this.prismaService.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    role: true
                }
            })

            if (!potentialPublished || potentialPublished.role === UserRoles.READER) {
                throw new NotFoundException('Такой пользователь не может опубликовать книгу или отредактировать информацию о ней, необходимо обладать правами администратора или публикатора')
            }

            if (!tag) {
                throw new BadRequestException('Для удаления информации о книге необходим тэг')
            }

            const potentialBook = await this.prismaService.book.findUnique({
                where: {
                    tag
                },
                select: {
                    publisherId: true
                }
            })

            if (!potentialBook) {
                throw new NotFoundException(`Книга по тэгу ${tag} не найдена`)
            }

            if (userId !== potentialBook.publisherId) {
                throw new UnauthorizedException('Только публикатор книги может удалить информацию о ней')
            }

            const deletedBook = await this.prismaService.book.delete({
                where: {
                    tag
                }
            })

            if (!deletedBook) {
                throw new NotImplementedException('Не удалось создать таблицу (отношение)')
            }

            const updatedPublished = await this.prismaService.published.update({
                where: {
                    userId
                },
                data: {
                    books: {
                        disconnect: {
                            tag: deletedBook.tag
                        }
                    }
                }
            })

            if (!updatedPublished) { throw new NotImplementedException('Не удалось обновить опубликованное') }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Книга '${deletedBook.heading}' успешно удалена`,
                    deletedBook
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
