import { ArgumentMetadata, Controller, Get, HttpStatus, Injectable, Param, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { AppService } from './app.service';

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
  @Get('/')
  getHello(@Param('id', CustomPipe) id: boolean) {
    return {
      typeof: typeof id,
      value: id,
    };
  }
}
