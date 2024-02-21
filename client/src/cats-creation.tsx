import { CloseSquareOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, List, Typography } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiProvider } from "./api-provider";

export type Cat = {
    id?: number;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
};

export function CatsCreation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isActive, setIsActive] = useState(false);

    const queryClient = useQueryClient();
    const createUserMutation = useMutation<void, AxiosError<string>, void>({
        mutationFn: () => apiProvider.cats.create({ firstName, isActive, lastName }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: "getCats",
            });
        },
    });

    const getUsersQuery = useQuery({
        queryKey: "getCats",
        queryFn: () => apiProvider.cats.getAll(),
    });

    const useDeleteUserMutation = useMutation({
        mutationFn: (id: number) => apiProvider.cats.delete(id),
        onSuccess(_data, id) {
            const previousUsers = queryClient.getQueryData<Cat[]>(["getCats"]);
            queryClient.setQueryData(
                "getCats",
                previousUsers?.filter((user) => user.id !== id)
            );
        },
    });

    return (
        <div>
            <Form layout="vertical" name="basic">
                <Form.Item<Cat> label="Имя" name="firstName" rules={[{ required: true, message: "Введите имя!" }]}>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>

                <Form.Item<Cat> label="Фамилия" name="lastName" rules={[{ required: true, message: "Введите фамилию!" }]}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>

                <Form.Item<Cat> name="isActive" valuePropName="checked">
                    <Checkbox value={isActive} onChange={(e) => setIsActive(e.target.checked)}>
                        Активный
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => createUserMutation.mutate()}>
                        Добавить
                    </Button>
                </Form.Item>

                {createUserMutation.isError && <Typography.Text>{createUserMutation.error.response?.data}</Typography.Text>}
            </Form>

            <List
                bordered
                loading={getUsersQuery.isLoading}
                dataSource={getUsersQuery.data}
                renderItem={(item) => (
                    <List.Item actions={[<CloseSquareOutlined onClick={() => useDeleteUserMutation.mutate(item.id!)} />]}>
                        {item.isActive && <Typography.Text mark>Активный</Typography.Text>} {item.firstName} {item.lastName}{" "}
                    </List.Item>
                )}
            />
        </div>
    );
}
