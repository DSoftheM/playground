import { Controller, Get } from '@nestjs/common';
import { ZooService } from './zoo/zoo.service';

@Controller('dynamic')
export class DynamicController {
  constructor(private zooService: ZooService) {}

  @Get('/')
  getDynamic() {
    return this.zooService.getAnimals();
  }
}

