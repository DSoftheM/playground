import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Get('/')
  getTodoList() {
    return this.todoListService.getTodoList();
  }

  @Post('/create-todo')
  createTodo(@Body() todo: CreateTodoDto) {
    return this.todoListService.createTodo(todo);
  }

  @Post('/update-todo')
  updateTodo(@Body() todo: UpdateTodoDto) {
    return this.todoListService.createTodo(todo);
  }
}

