import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookCreateDTO } from './dto/book-create.dto';
import { Response } from 'express';

@Injectable()
export class BooksService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(dto: BookCreateDTO, res: Response) {
        try {
            const { heading, tag, author, description, pages, isInStock, year, isbn, isSoftCover, publisherId, categoryId, themeId } = dto

            if (!heading || !tag || !author || !description || !pages || isInStock === undefined || !year || !isbn || isSoftCover === undefined || !publisherId || !categoryId || !themeId) {
                throw new BadRequestException(`Введены не все данные для создания книги - ${!heading ? 'Название ' : '' +
                    !tag ? 'Тэг ' : '' +
                        !author ? 'Автор ' : '' +
                            !description ? 'Описание ' : '' +
                                !pages ? 'Страницы' : '' +
                                    isInStock === undefined ? 'В наличии ' : '' +
                                        !year ? 'Год ' : '' +
                                            !isbn ? 'ISBN ' : '' +
                                                isSoftCover === undefined ? 'Тип обложки ' : '' +
                                                    !publisherId ? 'Публикатор ' : '' +
                                                        !categoryId ? 'Категория ' : '' +
                                                            !themeId ? 'Тема ' : ''
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

            const potentialPublished = await this.prismaService.user.findUnique({
                where: {
                    id: publisherId
                }
            })

            if (!potentialPublished) {
                throw new NotFoundException('Такой пользователь не мог опубликовать книгу')
            }

            const potentialCategory = await this.prismaService.category.findUnique({
                where: {
                    id: categoryId
                }
            })

            if (!potentialCategory) {
                throw new NotFoundException(`Категории с ID ${categoryId} не существует`)
            }

            const potentialTheme = await this.prismaService.theme.findUnique({
                where: {
                    id: themeId
                }
            })

            if (!potentialTheme) {
                throw new NotFoundException(`Темы с ID ${themeId} не существует`)
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
                    publisherId,
                    categoryId,
                    themeId
                }
            })

            if (!book) {
                throw new NotImplementedException('Не удалось создать таблицу (отношение)')
            }

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: `Книга ${heading} категории ${categoryId} успешно создана`,
                    book
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
