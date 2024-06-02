import { Module } from '@nestjs/common';
import { DynamicController } from './dynamic.controller';
import { DynamicService } from './dynamic.service';
import { ZooModule } from './zoo/zoo.module';

class Person {
  create() {
    return {
      animals: ['created'],
    };
  }
}

@Module({
  imports: [ZooModule.register({ animals: ['animal1', 'animal2'], isGlobal: false })],
  // imports: [ZooModule.registerAsync({ useClass: Person,  })],
  controllers: [DynamicController],
  providers: [DynamicService],
})
export class DynamicModule {}

