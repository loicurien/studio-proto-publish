import { Module } from '@nestjs/common';
import { UrlPresignerService } from './url-presigner.service';

@Module({
  providers: [UrlPresignerService],
  exports: [UrlPresignerService],
})
export class UrlPresignerModule {}
