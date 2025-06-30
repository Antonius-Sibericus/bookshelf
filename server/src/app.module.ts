import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { PrismaModule } from './app/prisma/prisma.module';
import { CategoriesModule } from './app/categories/categories.module';
import { ThemesModule } from './app/themes/themes.module';
import { UsersModule } from './app/users/users.module';
import { BooksModule } from './app/books/books.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { BasketsModule } from './app/baskets/baskets.module';
import { PublishedModule } from './app/published/published.module';

@Module({
  imports: [AuthModule, PrismaModule, CategoriesModule, ThemesModule, UsersModule, BooksModule, FavoritesModule, BasketsModule, PublishedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
