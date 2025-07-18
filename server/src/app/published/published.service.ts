import {  HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Request, Response } from 'express'
import { PrismaService } from '../prisma/prisma.service'
import { User } from 'generated/prisma'

@Injectable()
export class PublishedService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async get(req: Request, res: Response) {
        try {
            const userId = (req.user as User).id
            if (!userId) { throw new NotFoundException('ID пользователя не найден') }

            const published = await this.prismaService.published.findUnique({
                where: {
                    userId
                },
                select: {
                    books: true
                }
            })

            if (!published) { throw new NotFoundException('Книги в опубликованном не найдены') }
            const books = published.books

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
}
