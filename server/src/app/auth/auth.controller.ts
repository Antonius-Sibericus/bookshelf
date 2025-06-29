import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { SignupDTO } from './dto/signup.dto'
import { ApiOperation } from '@nestjs/swagger'
import { LoginDTO } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiOperation({
    summary: 'Создание аккаунта',
    description: 'Формирует запись в базе данных и выдаёт токен доступа, а токен обновления записывает в Cookie',
  })
  @Post('signup')
  public async signup(@Res({ passthrough: true }) res: Response, @Body() dto: SignupDTO) {
    return await this.authService.signup(dto, res)
  }

  @ApiOperation({
    summary: 'Вход в приложение',
    description: 'Принимает от пользователя почту и пароль и выдаёт токен доступа, а токен обновления записывает в Cookie'
  })
  @Post('login')
  public async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDTO) {
    return await this.authService.login(dto, res)
  }

  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Генерирует новый токен доступа, а токен обновления записывает в Cookie'
  })
  @Post('refresh')
  public async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res)
  }

  @ApiOperation({
    summary: "Выход из системы",
    description: "Удаляет токен обновления из Cookie"
  })
  @Post('logout')
  public async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res)
  }
}
