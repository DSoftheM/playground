import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoDto } from './dto/todo.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Get('/')
  getTodoList() {
    return this.todoListService.getTodoList();
  }

  @Post('/create-todo')
  createTodo(@Body() todo: TodoDto) {
    console.log(todo);
    return this.todoListService.createTodo(todo);
  }
}

