import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoListService {
  constructor(@InjectRepository(TodoEntity) private todoListRepository: Repository<TodoEntity>) {}

  getTodoList() {
    return this.todoListRepository.find();
  }

  createTodo(todo: CreateTodoDto) {
    return this.todoListRepository.save([todo]);
  }

  updateTodo(todo: UpdateTodoDto) {
    return this.todoListRepository.update(todo.id, todo);
  }
}

