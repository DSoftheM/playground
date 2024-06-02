import { Controller, Get } from '@nestjs/common';
import { ZooService } from './zoo.service';

@Controller('zoo')
export class ZooController {
  constructor(private zooService: ZooService) {}

  @Get('/')
  getAnimals() {
    return this.zooService.getAnimals();
  }
}

