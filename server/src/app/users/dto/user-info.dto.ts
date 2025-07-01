import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, MaxLength, IsEmail, IsOptional } from "class-validator"
import { UserRole } from "generated/prisma"

export class UserInfoDTO {
    @ApiProperty({
        name: 'Фамилия',
        description: 'Фамилия пользователя',
        example: 'Васильев',
        maxLength: 63,
        type: String
    })
    @IsOptional()
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    surname?: string
    
    @ApiProperty({
        name: 'Имя',
        description: 'Имя пользователя',
        example: 'Алексей',
        maxLength: 63,
        type: String
    })
    @IsOptional()
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    name?: string
    
    @ApiProperty({
        name: 'Отчество',
        description: 'Отчество пользователя',
        example: 'Аркадьевич',
        maxLength: 63,
        type: String
    })
    @IsOptional()
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    paternal?: string
    
    @ApiProperty({
        name: 'E-Mail',
        description: 'Электронная почта пользователя',
        example: 'example@mail.ru',
        maxLength: 63,
        type: String
    })
    @IsOptional()
    @IsString({ message: 'Значение должно иметь строковый тип' })
    @IsEmail({}, { message: 'Введите адрес электронной почты правильно' })
    @MaxLength(63, { message: 'Значение не должно быть длиннее 63 символов' })
    email?: string
    
    @ApiProperty({
        name: 'Роль',
        description: 'Роль пользователя - посетитель, читатель, публикатор, администратор',
        example: 'VISITOR',
    })
    @IsOptional()
    role?: UserRole
}