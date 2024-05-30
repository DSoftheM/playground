import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoListService {
  constructor(@InjectRepository(TodoEntity) private todoListRepository: Repository<TodoEntity>) {}

  getTodoList() {
    return this.todoListRepository.find();
  }

  createTodo(todo: TodoDto) {
    return this.todoListRepository.save([todo]);
  }
}

