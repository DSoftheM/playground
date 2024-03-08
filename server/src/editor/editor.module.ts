import { Module } from '@nestjs/common';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorContextEntity } from './editor-context.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EditorContextEntity])],
  controllers: [EditorController],
  providers: [EditorService],
})
export class EditorModule {}
