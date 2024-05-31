import { useState } from "react";
import { useTodoListQuery } from "./api/use-todo-list-query";
import { Button, Input } from "antd";
import { useCreateTodoMutation } from "./api/use-create-todo-mutation";
import { useUpdateTodoMutation } from "./api/use-update-todo-mutation";

export function TodoList() {
    const todoListQuery = useTodoListQuery();
    const createTodoMutation = useCreateTodoMutation();
    const updateTodoMutation = useUpdateTodoMutation();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const onCreate = () => {
        createTodoMutation.mutate({ title, text });
    };

    return (
        <div>
            <Input value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="Заголовок" />
            <Input.TextArea value={text} onChange={(ev) => setText(ev.target.value)} placeholder="Текст" />
            <Button onClick={onCreate} disabled={!title}>
                Создать
            </Button>
            {todoListQuery.data?.map((todo) => {
                return (
                    <div key={todo.id} style={todo.done ? { textDecoration: "line-through" } : {}}>
                        {todo.title}
                        {todo.text}
                        {todo.done ? (
                            <button onClick={() => updateTodoMutation.mutate({ ...todo, done: false })}>undone</button>
                        ) : (
                            <button onClick={() => updateTodoMutation.mutate({ ...todo, done: true })}>Done</button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
