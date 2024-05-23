import { Controller, Get, Query } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { MediaViewerMediaType } from './media-viewer-pdf-type';

@Controller('mediaViewer')
export class MediaViewerController {
  constructor(private mediaViewerService: MediaViewerService) {}

  @Get('/getPdf')
  getPdf(@Query('type') type: MediaViewerMediaType) {
    return this.mediaViewerService.getPdf(type);
  }
}

