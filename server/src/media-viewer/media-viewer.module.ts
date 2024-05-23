import { Module } from '@nestjs/common';
import { MediaViewerController } from './media-viewer.controller';
import { MediaViewerService } from './media-viewer.service';

@Module({
  controllers: [MediaViewerController],
  providers: [MediaViewerService]
})
export class MediaViewerModule {}
