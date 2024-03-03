import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatSchema } from './cat.entity';
import { UserSchema } from 'src/users/user.schema';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([CatSchema, UserSchema])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
