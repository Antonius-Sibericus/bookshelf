import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class UserPasswordDTO {
    @ApiProperty({
        name: 'Пароль',
        description: 'Пароль пользователя',
        example: '12345678Qq',
        maxLength: 63,
        required: true,
        type: String
    })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MinLength(6, { message: 'пароль не должен быть короче 6 символов' })
    @MaxLength(12, { message: 'пароль не должен быть длиннее 12 символов' })
    password: string
}