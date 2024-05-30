import { ICreateTodo } from '@shared/types/todo-list/create-todo.interface';
import { IsString } from 'class-validator';

export class CreateTodoDto implements ICreateTodo {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
