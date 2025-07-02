import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CategoryCreateDTO {
    @ApiProperty({
        name: 'Название категории',
        description: 'Название категории, которое будет подставлено в качестве категории книги',
        example: 'Учебники',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    title: string

    @ApiProperty({
        name: 'Тэг категории',
        description: 'Кодовое слово латинскими буквами для более удобной работы с данными',
        example: 'textbooks',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    tag: string
}