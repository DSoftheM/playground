import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Form, Input, List, Typography } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiProvider } from "../api-provider";
import { useGetAllUsersQuery } from "../use-get-all-users.query";
import { IUser } from "@shared/types/auth/user.interface";
import { CatListItem } from "./cat-list-item";
import { ICatView } from "@shared/types/cats/cat-view.interface";
import { ICatCreate } from "@shared/types/cats/cat-create.interface";

type CreateData = {
    newCat: ICatCreate;
    master: IUser;
};

export function CatsCreation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [master, setMaster] = useState<IUser | null>(null);

    const queryClient = useQueryClient();
    const createUserMutation = useMutation<string, AxiosError<string>, CreateData, string>({
        mutationFn: (data) => apiProvider.cats.create(data.newCat),
        onSuccess: (id, createData) => {
            let previousCats = queryClient.getQueryData<ICatView[]>(["getCats"]);
            if (!previousCats) {
                previousCats = [];
            }
            previousCats.push({ ...createData.newCat, id, master: createData.master });
        },
    });

    const getCatsQuery = useQuery({
        queryKey: ["getCats"],
        queryFn: () => apiProvider.cats.getAll(),
    });

    const useDeleteCatMutation = useMutation({
        mutationFn: (id: string) => apiProvider.cats.delete(id),
        onSuccess(_data, id) {
            const previousCats = queryClient.getQueryData<ICatView[]>(["getCats"]);
            queryClient.setQueryData(
                ["getCats"],
                previousCats?.filter((cat) => cat.id !== id)
            );
        },
    });

    const getAllUsersQuery = useGetAllUsersQuery();
    const items = (getAllUsersQuery.data ?? []).map((u, i) => ({
        label: <p onClick={() => setMaster(u)}>{u.login}</p>,
        key: i.toString(),
    }));

    return (
        <div>
            <Form layout="vertical" name="basic">
                <Form.Item<ICatCreate> label="Имя" name="firstName" rules={[{ required: true, message: "Введите имя!" }]}>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>

                <Form.Item<ICatCreate> label="Фамилия" name="lastName" rules={[{ required: true, message: "Введите фамилию!" }]}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>

                <Form.Item<ICatCreate> name="isActive" valuePropName="checked">
                    <Checkbox value={isActive} onChange={(e) => setIsActive(e.target.checked)}>
                        Активный
                    </Checkbox>
                </Form.Item>

                <Form.Item<ICatCreate>
                    label="Хозяин кошки"
                    name="masterId"
                    rules={[{ required: true, message: "Выберите хозяина!" }]}
                >
                    <Dropdown menu={{ items }} trigger={["click"]} arrow={{ pointAtCenter: true }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Button>
                                {master?.login ?? "Не выбран"}
                                <DownOutlined />
                            </Button>
                        </a>
                    </Dropdown>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            if (!master) return;
                            createUserMutation.mutate({ newCat: { firstName, isActive, lastName, masterId: master.id }, master });
                        }}
                    >
                        Добавить
                    </Button>
                </Form.Item>

                {createUserMutation.isError && <Typography.Text>{createUserMutation.error.response?.data}</Typography.Text>}
            </Form>

            <List
                itemLayout="vertical"
                bordered
                loading={getCatsQuery.isLoading}
                dataSource={getCatsQuery.data}
                renderItem={(catView) => <CatListItem item={catView} onDelete={() => useDeleteCatMutation.mutate(catView.id)} />}
            />
        </div>
    );
}
