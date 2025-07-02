import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest() as Request
        const token = request.headers['access_token']
        console.log(request.headers)
        if (!token) { throw new UnauthorizedException('Токен доступа не действителен или не найден') }
        return true
    }
}