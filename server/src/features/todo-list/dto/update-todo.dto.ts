import { IViewTodo } from '@shared/types/todo-list/view-todo.interface';
import { IsBoolean, IsDate, IsDateString, IsString, isDate } from 'class-validator';

export class UpdateTodoDto implements IViewTodo {
  @IsString()
  id: string;

  @IsBoolean()
  done: boolean;

  @IsDateString()
  createdAt: Date;

  @IsString()
  title: string;

  @IsString()
  text: string;
}
