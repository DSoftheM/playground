import { ICreateTodo } from '@shared/types/todo-list/create-todo.interface';
import { IsString } from 'class-validator';

export class TodoDto implements ICreateTodo {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
