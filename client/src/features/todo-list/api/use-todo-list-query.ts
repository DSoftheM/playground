import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "../../../react-query";
import { apiProvider } from "../../../api-provider";
import { IViewTodo } from "@shared/types/todo-list/view-todo.interface";

export const useTodoListQuery = () => {
    return useQuery<IViewTodo[]>({
        queryKey: [ReactQueryKey.TodoList],
        queryFn: () => apiProvider.features.todoList.get(),
    });
};
