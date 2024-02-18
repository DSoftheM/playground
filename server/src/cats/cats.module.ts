import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
