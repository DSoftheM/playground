import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IViewTodo } from '@shared/types/todo-list/view-todo.interface';

@Entity({ name: 'todo-list' })
export class TodoEntity implements IViewTodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
