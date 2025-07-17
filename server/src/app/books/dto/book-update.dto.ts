import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator'

export class BookUpdateDTO {
    @ApiProperty({
        name: 'Название книги',
        description: 'Название книги, которое будет подставлено в заголовке',
        example: 'Наедине с собой',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    heading?: string

    @ApiProperty({
        name: 'Автор книги',
        description: 'Имя автора книги, которое будет подставлено в заголовке',
        example: 'Марк Аврелий',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    author?: string

    @ApiProperty({
        name: 'Описание книги',
        description: 'Описание книги, которое будет подставлено в информации о книге',
        example: 'Великое произведение великого императора о стоической философии...',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(1023, { message: 'Значение не должно быть длиннее 63 символов' })
    description?: string

    @ApiProperty({
        name: 'Число страниц',
        description: 'Число страниц книги, которое будет подставлено в информации о книге',
        example: 457,
        type: Number
    })
    // @IsNumber({}, { message: 'Значение должно иметь целочисленный тип' })
    pages?: string
    // pages?: number

    @ApiProperty({
        name: 'В наличии',
        description: 'Булево значение о наличии книги, которое будет подставлено в информации о книге',
        example: true,
        type: Boolean
    })
    // @IsBoolean({ message: 'Значение должно иметь булев тип' })
    isInStock?: string
    // isInStock?: boolean

    @ApiProperty({
        name: 'Год выпуска',
        description: 'Год печати книги, будет подставлен в информации о книге',
        example: 2025,
        type: Number
    })
    // @IsNumber({}, { message: 'Значение должно иметь целочисленный тип' })
    year?: string
    // year?: number

    @ApiProperty({
        name: 'ISBN',
        description: 'Число ISBN книги, которое будет подставлено в информации о книге',
        example: 9992158107,
        type: Number
    })
    // @IsNumber({}, { message: 'Значение должно иметь целочисленный тип' })
    isbn?: string
    // isbn?: number

    @ApiProperty({
        name: 'Мягкая обложка',
        description: 'Булево значение о мягкости обложки книги, которое будет подставлено в информации о книге',
        example: true,
        type: Boolean
    })
    // @IsBoolean({ message: 'Значение должно иметь булев тип' })
    isSoftCover?: string
    // isSoftCover?: boolean

    @ApiProperty({
        name: 'Категория книги (тэг)',
        description: 'Категория книги, которое будет подставлено в информации о книге',
        example: 'philosophy',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    categoryTag?: string

    @ApiProperty({
        name: 'Тема книги (тэг)',
        description: 'Тема книги из определённой категории, которое будет подставлено в информации о книге',
        example: 'antique',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    themeTag?: string
}