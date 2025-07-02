import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class CategoryUpdateDTO {
    @ApiProperty({
        name: 'Название категории',
        description: 'Название категории, которое будет подставлено в качестве заголовка книги',
        example: 'Учебники',
        maxLength: 63,
        type: String || null || undefined
    })
    @IsOptional()
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    title?: string
}