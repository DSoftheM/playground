import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactQueryKey } from "../../../react-query";
import { apiProvider } from "../../../api-provider";
import { ICreateTodo } from "@shared/types/todo-list/create-todo.interface";

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: ICreateTodo) => apiProvider.features.todoList.createTodo(todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ReactQueryKey.TodoList] }),
    });
};
