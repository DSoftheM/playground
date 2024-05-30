import { IBaseTodo } from "./base-todo.interface";

export interface IViewTodo extends IBaseTodo {
    id: string;
    createdAt: Date;
}
