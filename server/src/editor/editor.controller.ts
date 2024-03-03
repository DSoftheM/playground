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

  @Get('/')
  getHtmlFromTemplat1e() {
    return 123;
  }
}

