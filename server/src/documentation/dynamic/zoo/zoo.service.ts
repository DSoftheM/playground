import { DynamicModule, Inject, Injectable } from '@nestjs/common';
import { ZOO_ANIMALS } from './constants';
import { MODULE_OPTIONS_TOKEN } from './zoo.module-definition';
import { ZooModuleOptions } from './zoo-module-options';

@Injectable()
export class ZooService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: ZooModuleOptions) {}

  getAnimals() {
    return this.options.animals;
  }
}

