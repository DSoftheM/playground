import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import hbs from 'handlebars';
import { EditorContextEntity } from './editor-context.entity';
import { Repository } from 'typeorm';
import puppeteer, { Page } from 'puppeteer';
import * as fs from 'fs/promises';

function contextToRecord(context: EditorContextEntity[]) {
  return context.reduce((record, item) => {
    record[item.name] = item.value;
    return record;
  }, {});
}

@Injectable()
export class EditorService {
  private page: Page;

  constructor(@InjectRepository(EditorContextEntity) private contextRepository: Repository<EditorContextEntity>) {
    puppeteer
      .launch()
      .then((browser) => browser.newPage())
      .then((page) => {
        this.page = page;
      });
  }

  async saveContext(userId: number, context: Record<string, string>) {
    const data: EditorContextEntity[] = Object.keys(context).map((name) => ({ name, value: context[name], userId }));
    await this.contextRepository.delete({ userId });
    await this.contextRepository.save(data);
  }

  async getContext(userId: number) {
    return this.contextRepository.find({ where: { userId } }).then(contextToRecord);
  }

  async getHtmlFromTemplate(userId: number, templateString: string) {
    const template = hbs.compile(templateString);
    const context = await this.contextRepository.find({ where: { userId } });
    return template(contextToRecord(context));
  }

  async getPdfFromTemplate(userId: number, templateString: string) {
    const html = await this.getHtmlFromTemplate(userId, templateString);
    await this.page.setContent(html, { waitUntil: 'domcontentloaded' });
    const pdf = await this.page.pdf();
    await fs.writeFile('./test.pdf', pdf);
    return pdf;
  }
}
