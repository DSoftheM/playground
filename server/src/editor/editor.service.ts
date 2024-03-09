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
}
