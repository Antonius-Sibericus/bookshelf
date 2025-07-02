import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator"

export class ThemeUpdateDTO {
    @ApiProperty({
        name: 'Название темы',
        description: 'Название темы, которое будет подставлено в качестве темы книги',
        example: 'Физика',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsOptional()
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    title?: string

    @ApiProperty({
        name: 'Тэг категории',
        description: 'Тэг категории, к которой относится данная тема',
        example: 'textbooks',
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsOptional()
    categoryTag?: string
}