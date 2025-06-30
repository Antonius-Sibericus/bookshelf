import { Module } from '@nestjs/common';
import { PublishedService } from './published.service';
import { PublishedController } from './published.controller';

@Module({
  controllers: [PublishedController],
  providers: [PublishedService],
})
export class PublishedModule {}
