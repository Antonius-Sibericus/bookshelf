import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../../types/jwt.interface'
import { Request, Response } from 'express'
import { isDev } from 'src/utils/is-dev.util'
import { SignupDTO } from './dto/signup.dto'
import { hash, verify } from 'argon2'
import { LoginDTO } from './dto/login.dto'
import { UserPasswordDTO } from '../users/dto/user-password.dto'
import * as uuid from 'uuid'
import { UserRole } from 'generated/prisma'
import { MailService } from './authUtils/mail.service'

@Injectable()
export class AuthService {
    private readonly JWT_ACCESS_TOKEN_TTL: string
    private readonly JWT_REFRESH_TOKEN_TTL: string
    private readonly COOKIE_DOMAIN: string

    constructor(
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL')
        this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL')
        this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
    }

    private generateTokens(id: string, email: string, role: UserRole) {
        const payload: JwtPayload = { id, email, role }
        const accessToken = this.jwtService.sign(payload, { expiresIn: this.JWT_ACCESS_TOKEN_TTL })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: this.JWT_REFRESH_TOKEN_TTL })
        return { accessToken, refreshToken }
    }

    public setCookie(res: Response, value: string, expires: Date): void {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            secure: true,
            sameSite: isDev(this.configService) ? 'none' : 'lax'
        })
    }

    private auth(res: Response, id: string, email: string, role: UserRole) {
        const { accessToken, refreshToken } = this.generateTokens(id, email, role)
        this.setCookie(
            res,
            refreshToken,
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        )

        return accessToken
    }

    public async validate(id: string) {
        const user = await this.prismaService.user.findUnique({ where: { id } })
        if (!user) { throw new NotFoundException('Пользователь по переданному ID не найден') }
        return user
    }

    public async signup(dto: SignupDTO, res: Response) {
        try {
            const { surname, name, paternal, email, password, role } = dto

            if (!surname || !name || !email || !password) {
                throw new BadRequestException(`Введены не все данные для регистрации - ${!surname ? 'Фамилия ' : '' +
                    !name ? 'Имя ' : '' +
                        !email ? 'E-Mail ' : '' +
                            !password ? 'Пароль ' : ''
                    }`)
            }

            const potentialUser = await this.prismaService.user.findUnique({ where: { email } })
            if (potentialUser) { throw new ConflictException('Пользователь с таким email уже существует') }

            const activationLink = uuid.v4()

            const user = await this.prismaService.user.create({
                data: {
                    surname,
                    name,
                    paternal: paternal ? paternal : '',
                    email,
                    password: await hash(password),
                    activationLink: activationLink,
                    role: role ? role : 'READER'
                }
            })
            this.mailService.sendActivationMail(email, `${this.configService.getOrThrow('SERVER_URL')}/auth/activate/${activationLink}`)

            const basket = await this.prismaService.basket.create({
                data: {
                    user: {
                        connect: { id: user.id }
                    }
                }
            })

            const published = await this.prismaService.published.create({
                data: {
                    user: {
                        connect: { id: user.id }
                    }
                }
            })

            const favorites = await this.prismaService.favorites.create({
                data: {
                    user: {
                        connect: { id: user.id }
                    }
                }
            })

            if (!user || !basket || !published || !favorites) {
                throw new NotImplementedException(`Не удалось создать таблицу (отношение) - ${!user ? 'Пользователь' : '' +
                    !basket ? 'Корзина пользователя' : '' +
                        !published ? 'Опубликованные книги' : '' +
                            !favorites ? ' Избранное' : ''
                    }`)
            }

            const accessToken = this.auth(res, user.id, user.email, user.role)

            return res
                .status(HttpStatus.CREATED)
                .json({
                    error: false,
                    message: `Пользователь ${user.surname + ' ' + user.name} успешно зарегистрирован`,
                    accessToken,
                    user
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async activate(activationLink: string, res: Response) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    activationLink
                }
            })
    
            if (!user) { throw new NotFoundException('Пользователь с такой ссылкой не найден') }
            
            const updatedUser = await this.prismaService.user.update({
                where: {
                    activationLink
                },
                data: {
                    isActivated: true
                }
            })

            console.log(updatedUser)
        } catch (err) {
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async login(dto: LoginDTO, res: Response) {
        try {
            const { email, password } = dto

            if (!email || !password) {
                throw new BadRequestException(`Введены не все данные для авторизации - ${!email ? 'E-Mail' : '' +
                    !password ? 'Пароль' : ''
                    }`)
            }

            const user = await this.prismaService.user.findUnique({
                where: { email }
            })

            if (!user) { throw new NotFoundException(`Пользователя с E-Mail ${email} не найден. Корректно введите E-Mail`) }

            const isValidPassword = await verify(user.password, password)
            if (!isValidPassword) { throw new UnauthorizedException('Корректно введите пароль') }
            const accessToken = this.auth(res, user.id, email, user.role)

            return res
                .status(HttpStatus.ACCEPTED)
                .json({
                    error: false,
                    message: `Вход выполен успешно. Добро пожаловать, ${user.name + ' ' + user.paternal}!`,
                    accessToken,
                    user
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async refresh(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken']
            if (!refreshToken) { throw new UnauthorizedException('Недействительный токен. Пройдите авторизацию') }

            const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken)
            if (!payload) { throw new InternalServerErrorException('Внутренняя ошибка (JWT verification)') }

            const user = await this.prismaService.user.findUnique({
                where: { id: payload.id }
            })

            if (!user) { throw new NotFoundException('Пользователь не найден, обновление токенов невозможно') }

            const accessToken = this.auth(res, user.id, user.email, user.role)

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Токены обновлены успешно`,
                    accessToken,
                    user
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async patchPassword(id: string, dto: UserPasswordDTO, res: Response) {
        try {
            if (!id) { throw new BadRequestException('Для обновления информации о пользователе необходим ID') }

            const { password } = dto
            if (!password) { throw new BadRequestException('Новый пароль не найден') }

            const oldData = await this.prismaService.user.findUnique({
                where: { id },
                select: { password: true }
            })

            if (!oldData) { throw new NotFoundException(`Пользователя с ID ${id} не существует`) }

            const isValidPassword = await verify(oldData.password, password)
            if (isValidPassword) { throw new ConflictException('Новый пароль не должен совпадать со старым') }

            const newPassword = await hash(password)

            const user = await this.prismaService.user.update({
                where: { id },
                data: { password: newPassword }
            })

            if (!user) { throw new NotImplementedException('Не удалось обновить пароль') }

            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Пароль пользователя ${user.surname + ' ' + user.name} успешно обновлен`,
                    user
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }

    public async logout(res: Response) {
        try {
            this.setCookie(res, 'refreshToken', new Date(0))
            return res
                .status(HttpStatus.OK)
                .json({
                    error: false,
                    message: `Выход выполнен, токен обновления удалён из Cookie`
                })
        } catch (err) {
            console.error(err.message)
            return res.status(HttpStatus.NOT_IMPLEMENTED).json({ error: true, message: err.message })
        }
    }
}
