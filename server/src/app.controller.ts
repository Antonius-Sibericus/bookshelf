import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Корневой путь (без функционала)')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
