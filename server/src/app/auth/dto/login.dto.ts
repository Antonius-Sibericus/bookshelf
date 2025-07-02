import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {
    @ApiProperty({
        name: 'E-Mail',
        description: 'Электронная почта пользователя',
        example: 'example@mail.ru',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsEmail({}, { message: 'Введите адрес электронной почты правильно' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    email: string

    @ApiProperty({
        name: 'Пароль',
        description: 'Пароль пользователя',
        example: '12345678Qq',
        maxLength: 63,
        type: String
    })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MinLength(6, { message: 'пароль не должен быть короче 6 символов' })
    @MaxLength(12, { message: 'пароль не должен быть длиннее 12 символов' })
    password: string
}