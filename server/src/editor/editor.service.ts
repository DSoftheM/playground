import { Injectable } from '@nestjs/common';
import hbs from 'handlebars';

@Injectable()
export class EditorService {
  getHtmlFromTemplate(templateString: string) {
    const template = hbs.compile(templateString);
    return template({ name: 'Alex' });
  }
}

