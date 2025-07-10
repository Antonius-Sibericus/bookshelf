import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { User } from 'generated/prisma'
import { Roles } from 'src/decorators/roles.decorator'
import { JwtPayload } from 'src/types/jwt.interface'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request

        // const tokenHeader = request.headers['Authorization']
        // if (!tokenHeader) { throw new UnauthorizedException('Токен доступа не действителен или не найден') }

        const accessToken = this.extractTokenFromHeader(request)
        if (!accessToken) { throw new UnauthorizedException('Токен доступа не действителен или не найден') }

        try {
            const userData: JwtPayload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.getOrThrow<string>('JWT_SECRET')
            })
            if (!userData) { throw new UnauthorizedException('Токен доступа не действителен или не найден') }
            request['user'] = userData
            console.log(request['user'])

            const roles = this.reflector.get(Roles, context.getHandler())

            if (!roles) {
                return true
            }
            const user = request.user

            return roles.includes((user as User).role)
        } catch (err) {
            console.log(err.message)
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}