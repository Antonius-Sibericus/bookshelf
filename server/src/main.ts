import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { setUpSwagger } from './utils/swagger.util'
import fileupload from 'express-fileupload'

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5170', 'http://localhost:5171', 'http://localhost:5172', 'http://localhost:5174'],
    credentials: true
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  setUpSwagger(app)
  // app.use(fileupload())
  await app.listen(process.env.PORT || port, () => console.log('Server is running on port ' + port))
}
bootstrap()
