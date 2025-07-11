import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './app/auth/auth.module'
import { PrismaModule } from './app/prisma/prisma.module'
import { CategoriesModule } from './app/categories/categories.module'
import { ThemesModule } from './app/themes/themes.module'
import { UsersModule } from './app/users/users.module'
import { BooksModule } from './app/books/books.module'
import { FavoritesModule } from './app/favorites/favorites.module'
import { BasketsModule } from './app/baskets/baskets.module'
import { PublishedModule } from './app/published/published.module'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from './config/jwt.config'

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    PrismaModule,
    CategoriesModule,
    ThemesModule,
    UsersModule,
    BooksModule,
    FavoritesModule,
    BasketsModule,
    PublishedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
