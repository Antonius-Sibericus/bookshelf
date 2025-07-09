import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { setUpSwagger } from './utils/swagger.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5170', 'http://localhost:5171', 'http://localhost:5172', 'http://localhost:5174'],
    credentials: true,
    methods: '*',
    exposedHeaders: '*',
    allowedHeaders: '*'
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  setUpSwagger(app)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
