import { Controller } from '@nestjs/common';
import { PublishedService } from './published.service';

@Controller('published')
export class PublishedController {
  constructor(private readonly publishedService: PublishedService) {}
}
