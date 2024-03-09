import { Body, Controller, Get, Post } from '@nestjs/common';
import { EditorService } from './editor.service';
import { SetPublic } from 'src/global/set-public';
import { EditorTemplateDto } from './editor-template.dto';
import { ReqUser } from 'src/settings/decorators/req-user.decorator';
import { UserDTO } from 'src/users/user.dto';

@SetPublic()
@Controller('/editor')
export class EditorController {
  constructor(private editorService: EditorService) {}

  @Post('getHtml')
  getHtmlFromTemplate(@Body() template: EditorTemplateDto, @ReqUser() user: UserDTO) {
    return this.editorService.getHtmlFromTemplate(user.id, template.text);
  }

  @Post('getPdf')
  getPdfFromTemplate(@Body() template: EditorTemplateDto, @ReqUser() user: UserDTO) {
    return this.editorService.getPdfFromTemplate(user.id, template.text);
  }

  @Post('saveContext')
  async saveEditorContext(@Body('context') context: Record<string, string>, @ReqUser() user: UserDTO) {
    await this.editorService.saveContext(user.id, context);
  }

  @Get('getContext')
  async getEditorContext(@ReqUser() user: UserDTO) {
    return await this.editorService.getContext(user.id);
  }
}
