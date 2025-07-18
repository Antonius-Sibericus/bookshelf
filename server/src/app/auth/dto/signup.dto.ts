import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { UserRole } from 'generated/prisma'


export class SignupDTO {
    @ApiProperty({
        name: 'Фамилия',
        description: 'Фамилия пользователя',
        example: 'Васильев',
        maxLength: 63,
        required: true,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    surname: string

    @ApiProperty({
        name: 'Имя',
        description: 'Имя пользователя',
        example: 'Алексей',
        maxLength: 63,
        required: true,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    name: string

    @ApiProperty({
        name: 'Отчество',
        description: 'Отчество пользователя',
        example: 'Аркадьевич',
        maxLength: 63,
        type: String
    })
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsOptional()
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    paternal: string

    @ApiProperty({
        name: 'E-Mail',
        description: 'Электронная почта пользователя',
        example: 'example@mail.ru',
        maxLength: 63,
        required: true,
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
        minLength: 6,
        maxLength: 12,
        required: true,
        type: String
    })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    @MinLength(6, { message: 'пароль не должен быть короче 6 символов' })
    @MaxLength(12, { message: 'пароль не должен быть длиннее 12 символов' })
    password: string

    @ApiProperty({
        name: 'Роль',
        description: 'Роль пользователя - посетитель, читатель, публикатор, администратор',
        example: 'READER',
        required: true,
    })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    role: UserRole
}