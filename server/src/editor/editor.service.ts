import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import hbs from 'handlebars';
import { EditorContextEntity } from './editor-context.entity';
import { Repository } from 'typeorm';

function contextToRecord(context: EditorContextEntity[]) {
  return context.reduce((record, item) => {
    record[item.name] = item.value;
    return record;
  }, {});
}

@Injectable()
export class EditorService {
  constructor(@InjectRepository(EditorContextEntity) private contextRepository: Repository<EditorContextEntity>) {}

  async saveContext(context: Record<string, string>) {
    const data = Object.keys(context).map((name) => ({ name, value: context[name] }));
    await this.contextRepository.clear();
    await this.contextRepository.save(data);
  }

  async getContext() {
    return this.contextRepository.find().then(contextToRecord);
  }

  async getHtmlFromTemplate(templateString: string) {
    const template = hbs.compile(templateString);
    const context = await this.contextRepository.find();
    return template(contextToRecord(context));
  }
}
