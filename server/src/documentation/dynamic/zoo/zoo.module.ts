import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';
import { ZooController } from './zoo.controller';
import { ZooService } from './zoo.service';
import { ZOO_ANIMALS } from './constants';
import { ConfigurableModuleClass } from './zoo.module-definition';

@Module({
  controllers: [ZooController],
  providers: [ZooService],
  exports: [ZooService],
})
export class ZooModule extends ConfigurableModuleClass {
  // static register(options: ZooModuleOptions): DynamicModule {
  //   return {
  //     module: ZooModule,
  //     controllers: [ZooController],
  //     exports: [ZooService],
  //     imports: [],
  //     providers: [ZooService, { provide: ZOO_ANIMALS, useValue: options.animals }],
  //   };
  // }
}

