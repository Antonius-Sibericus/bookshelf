import { Body, Controller, Delete, Get, Param, Patch, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserInfoDTO } from './dto/user-info.dto';
import { UserPasswordDTO } from './dto/user-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @ApiOperation({
    summary: 'Поиск всех пользователей',
    description: 'Находит и возвращает массив пользователей с их ID, ФИО, e-mail и публикаций'
  })
  @Get()
  public async findAllUsers(@Res() res: Response) {
    return await this.usersService.findAll(res)
  }

  @ApiOperation({
    summary: 'Поиск пользователя по ID',
    description: 'Находит и возвращает пользователя по ID, переданному в параметры'
  })
  @Get(':id')
  public async findUserById(@Param('id') id: string, @Res() res: Response) {
    return await this.usersService.findById(id, res)
  }

  @ApiOperation({
    summary: 'Изменение информации пользователя по ID',
    description: 'Изменяет и возвращает информацию о пользователе по ID, переданному в параметры'
  })
  @Patch(':id')
  public async changeUserInfo(@Param('id') id: string, @Body() dto: UserInfoDTO, @Res() res: Response) {
    return await this.usersService.patchInfo(id, dto, res)
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
    description: 'Удаляет запись о пользователе по ID, если он и есть текущий пользователь, то производится удаление токенов'
  })
  @Delete(':id')
  public async deleteUser(@Req() req: Request, @Param('id') id: string, @Res() res: Response) {
    return await this.usersService.delete(req, id, res)
  }
}
