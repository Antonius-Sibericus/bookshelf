import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Request, Response } from 'express'
import { AuthService } from '../auth/auth.service'
import { JwtPayload } from 'src/types/jwt.interface'
import { JwtService } from '@nestjs/jwt'
import { UserInfoDTO } from './dto/user-info.dto'
import { UserPasswordDTO } from './dto/user-password.dto'

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    public async findAll(res: Response) {
        try {
            const users = await this.prismaService.user.findMany({
                select: {
                    id: true,
                    surname: true,
                    name: true,
                    paternal: true,
                    email: true,
                    role: true,
                    publisherOf: true
                }
            })

            if (!users || users.length === 0) {
                throw new NotFoundException('Ошибка при поиске пользователей')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Пользователи найдены',
                    users
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async findById(id: string, res: Response) {
        try {
            if (!id) {
                throw new BadRequestException('ID пользователя не найден')
            }

            const user = await this.prismaService.user.findUnique({
                where: {
                    id
                }
            })

            if (!user) {
                throw new NotFoundException(`Пользователь по ID ${id} не найден`)
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: 'Пользователь найден',
                    user
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async patchInfo(id: string, dto: UserInfoDTO, res: Response) {
        try {
            if (!id) {
                throw new BadRequestException('Для обновления информации о пользователе необходим ID')
            }

            const { surname, name, paternal, email, role } = dto

            const oldData = await this.prismaService.user.findUnique({
                where: {
                    id
                }
            })

            if (!oldData) {
                throw new NotFoundException(`ТПользователь с ID ${id} не найден`)
            }

            const updatedUser = await this.prismaService.user.update({
                where: {
                    id
                },
                data: {
                    surname: surname ? surname : oldData.surname,
                    name: name ? name : oldData.name,
                    paternal: paternal ? paternal : oldData.paternal,
                    email: email ? email : oldData.email,
                    role: role ? role : oldData.role
                }
            })

            if (!updatedUser) {
                throw new NotImplementedException('Не удалось обновить информацию о пользователе')
            }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Информация о пользователе ${updatedUser.surname + ' ' + updatedUser.name} успешно обновлена`,
                    updatedUser
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async delete(req: Request, id: string, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']

            if (!refreshToken) {
                throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию')
            }

            const payload: JwtPayload = await this.jwtService.decode(refreshToken)


            if (!payload) {
                throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)')
            }

            const potentialUser = await this.prismaService.user.findUnique({
                where: {
                    id
                }
            })

            if (!potentialUser) {
                throw new NotFoundException(`Пользователь по ID ${id} не найден`)
            }

            if (potentialUser.id !== payload.id) {
                throw new UnauthorizedException('Пользователя может удалить только он сам')
            }
            
            this.authService.setCookie(res, 'refreshToken', new Date(0))

            const deletedUser = await this.prismaService.user.delete({
                where: {
                    id
                }
            })

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Пользователь ${deletedUser.surname + ' ' + deletedUser.name} успешно удален`,
                    deletedUser
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
