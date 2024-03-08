import { Body, Controller, Get, Post } from '@nestjs/common';
import { EditorService } from './editor.service';
import { SetPublic } from 'src/global/set-public';
import { EditorTemplateDto } from './editor-template.dto';

@SetPublic()
@Controller('/editor')
export class EditorController {
  constructor(private editorService: EditorService) {}

  @Post('getHtml')
  getHtmlFromTemplate(@Body() template: EditorTemplateDto) {
    return this.editorService.getHtmlFromTemplate(template.text);
  }

  @Post('saveContext')
  async saveEditorContext(@Body('context') context: Record<string, string>) {
    await this.editorService.saveContext(context);
  }

  @Get('getContext')
  async getEditorContext() {
    return await this.editorService.getContext();
  }
}
