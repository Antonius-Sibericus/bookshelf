import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class ThemeCreateDTO {
    @ApiProperty({
        name: 'Название темы',
        description: 'Название темы, которое будет подставлено в качестве темы книги',
        example: 'Физика',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    title: string

    @ApiProperty({
        name: 'Тэг темы',
        description: 'Кодовое слово латинскими буквами для более удобной работы с данными',
        example: 'physics',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    tag: string

    @ApiProperty({
        name: 'Тэг категории',
        description: 'Тэг категории, к которой относится данная тема',
        example: 'textbooks',
        type: String
    })
    @IsString({ message: 'Значение "категория" должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле "категория" не должно быть пустым' })
    categoryTag: string
}