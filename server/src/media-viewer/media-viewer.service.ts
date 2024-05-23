import { Injectable } from '@nestjs/common';
import { MediaViewerMediaType } from './media-viewer-pdf-type';
import fs from 'fs/promises';

@Injectable()
export class MediaViewerService {
  async getPdf(type: MediaViewerMediaType) {
    const path = '/static/pdf/sample.pdf';
    if (type === MediaViewerMediaType.Link) return path;
    if (type === MediaViewerMediaType.Stream) {
      return await fs.readFile(`.${path}`, { encoding: 'binary' });
    }
  }
}

