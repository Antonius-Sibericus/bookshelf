import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { JwtPayload } from 'src/types/jwt.interface'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BasketsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    public async get(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }

            const booksInBasket = await this.prismaService.basket.findUnique({
                where: { userId },
                select: { books: true }
            })

            if (!booksInBasket) { throw new NotFoundException('Книги в корзине не найдены') }
            const books = booksInBasket.books

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
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId || !bookTag) {
                throw new BadRequestException(`Получены не все данные - ${!userId ? 'ID пользователя ' : '' + !bookTag ? 'Тэг книги ' : ''}`)
            }

            const potentialUser = await this.prismaService.user.findUnique({ where: { id: userId } })
            if (!potentialUser) { throw new NotFoundException(`Пользователь с ID ${userId} не найден`) }

            const potentialBook = await this.prismaService.book.findUnique({ where: { tag: bookTag } })
            if (!potentialBook) { throw new NotFoundException(`Книга с тэгом ${bookTag} не найдена`) }

            const basket = await this.prismaService.basket.findUnique({ where: { userId } })
            if (!basket) { throw new NotFoundException('Корзина пользователя не найдена') }

            const updatedBasket = await this.prismaService.basket.update({
                where: { userId },
                data: {
                    books: {
                        connect: { tag: bookTag }
                    }
                },
                select: { books: true }
            })

            if (!updatedBasket) { throw new NotImplementedException(`Не удалось добавить книгу ${bookTag} в корзину пользователя`) }
            const books = updatedBasket.books

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: 'Книга добавлена успешно, корзина обновлена',
                    books
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async remove(req: Request, bookTag: string, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const userId = payload.id
            if (!userId || !bookTag) {
                throw new BadRequestException(`Получены не все данные - ${!userId ? 'ID пользователя ' : '' + !bookTag ? 'Тэг книги ' : ''}`)
            }

            const potentialUser = await this.prismaService.user.findUnique({ where: { id: userId } })
            if (!potentialUser) { throw new NotFoundException(`Пользователь с ID ${userId} не найден`) }

            const potentialBook = await this.prismaService.book.findUnique({ where: { tag: bookTag } })
            if (!potentialBook) { throw new NotFoundException(`Книга с тэгом ${bookTag} не найдена`) }

            const basket = await this.prismaService.basket.findUnique({ where: { userId } })
            if (!basket) { throw new NotFoundException('Корзина пользователя не найдена') }

            const updatedBasket = await this.prismaService.basket.update({
                where: { userId },
                data: {
                    books: {
                        disconnect: { tag: bookTag }
                    }
                },
                select: { books: true }
            })

            if (!updatedBasket) { throw new NotImplementedException(`Не удалось убрать книгу ${bookTag} из корзины пользователя`) }
            const books = updatedBasket.books

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: 'Книга убрана успешно, корзина обновлена',
                    books
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
