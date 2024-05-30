import { IViewTodo } from "@shared/types/todo-list/view-todo.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiProvider } from "../../../api-provider";
import { ReactQueryKey } from "../../../react-query";

export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: IViewTodo) => apiProvider.features.todoList.updateTodo(todo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ReactQueryKey.TodoList] }),
    });
};
