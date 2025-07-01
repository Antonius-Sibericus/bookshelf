import { Body, Controller, Param, Patch, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { SignupDTO } from './dto/signup.dto'
import { ApiOperation } from '@nestjs/swagger'
import { LoginDTO } from './dto/login.dto'
import { UserPasswordDTO } from '../users/dto/user-password.dto'

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
    summary: 'Изменение пароля пользователя по ID',
    description: 'Изменяет и возвращает пароль пользователе по ID, переданному в параметры'
  })
  @Patch(':id')
  public async changeUserPassword(@Param('id') id: string, @Body() dto: UserPasswordDTO, @Res() res: Response) {
    return await this.authService.patchPassword(id, dto, res)
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
