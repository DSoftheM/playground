import { ArgumentMetadata, Controller, Get, HttpStatus, Injectable, Param, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { AppService } from './app.service';
import { SetPublic } from './global/set-public';

@Injectable()
class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value :>> ', value);
    console.log('metadata :>> ', metadata);
    return value;
  }
}

@Controller()
export class AppController {
  @SetPublic()
  @Get('/')
  getIndex() {
    return 123;
  }
}
