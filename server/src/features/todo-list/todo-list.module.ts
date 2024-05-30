import { Module } from '@nestjs/common';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';

@Module({
  controllers: [TodoListController],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoListService],
})
export class TodoListModule {}

