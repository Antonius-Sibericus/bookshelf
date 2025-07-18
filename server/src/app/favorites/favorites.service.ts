import { BadRequestException, HttpStatus, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common'
import { Request, Response } from 'express'
import { PrismaService } from '../prisma/prisma.service'
import { User } from 'generated/prisma'

@Injectable()
export class FavoritesService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    public async get(req: Request, res: Response) {
        try {
            const userId = (req.user as User).id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }

            const booksInFavorites = await this.prismaService.favorites.findUnique({
                where: {
                    userId
                },
                select: {
                    books: true
                }
            })

            if (!booksInFavorites) { throw new NotFoundException('Книги в избранном не найдены') }
            const books = booksInFavorites.books

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Книги найдны',
                    books
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async add(req: Request, bookTag: string, res: Response) {
        try {
            const userId = (req.user as User).id
            if (!userId || !bookTag) {
                throw new BadRequestException(`Получены не все данные - ${!userId ? 'ID пользователя ' : '' + !bookTag ? 'Тэг книги ' : ''}`)
            }

            const potentialUser = await this.prismaService.user.findUnique({ where: { id: userId } })
            if (!potentialUser) { throw new NotFoundException(`Пользователь с ID ${userId} не найден`) }

            const potentialBook = await this.prismaService.book.findUnique({ where: { tag: bookTag } })
            if (!potentialBook) { throw new NotFoundException(`Книга с тэгом ${bookTag} не найдена`) }

            const favorites = await this.prismaService.favorites.findUnique({ where: { userId } })
            if (!favorites) { throw new NotFoundException('Избранное пользователя не найдено') }

            const updatedFavorites = await this.prismaService.favorites.update({
                where: {
                    userId
                },
                data: {
                    books: {
                        connect: {
                            tag: bookTag
                        }
                    }
                },
                select: {
                    books: true
                }
            })

            if (!updatedFavorites) { throw new NotImplementedException(`Не удалось добавить книгу ${bookTag} в избранное пользователя`) }
            const books = updatedFavorites.books

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: 'Книга добавлена успешно, избранное обновлено',
                    books
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async remove(req: Request, bookTag: string, res: Response) {
        try {
            const userId = (req.user as User).id
            if (!userId || !bookTag) {
                throw new BadRequestException(`Получены не все данные - ${!userId ? 'ID пользователя ' : '' + !bookTag ? 'Тэг книги ' : ''}`)
            }

            const potentialUser = await this.prismaService.user.findUnique({ where: { id: userId } })
            if (!potentialUser) { throw new NotFoundException(`Пользователь с ID ${userId} не найден`) }

            const potentialBook = await this.prismaService.book.findUnique({ where: { tag: bookTag } })
            if (!potentialBook) { throw new NotFoundException(`Книга с тэгом ${bookTag} не найдена`) }

            const favorites = await this.prismaService.favorites.findUnique({ where: { userId } })
            if (!favorites) { throw new NotFoundException('Избранное пользователя не найдено') }

            const updatedFavorites = await this.prismaService.favorites.update({
                where: {
                    userId
                },
                data: {
                    books: {
                        disconnect: {
                            tag: bookTag
                        }
                    }
                },
                select: {
                    books: true
                }
            })

            if (!updatedFavorites) { throw new NotImplementedException(`Не удалось убрать книгу ${bookTag} из избранного пользователя`) }
            const book = updatedFavorites.books

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: 'Книга убрана успешно, избранное обновлено',
                    book
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
