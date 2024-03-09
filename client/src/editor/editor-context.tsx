import { Button, Flex, Form, Input, Typography } from "antd";
import { uuid } from "../lib/uuid";
import { useImmer } from "use-immer";
import { useMutation, useQueryClient } from "react-query";
import { apiProvider } from "../api-provider";
import { QueryKey } from "../query-key";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
    initialContext: Record<string, string>;
};

export function EditorContext(props: Props) {
    const [context, updateContext] = useImmer<Record<string, { name: string; value: string }>>(
        Object.keys(props.initialContext).reduce((total, name) => {
            total[uuid()] = { name, value: props.initialContext[name] };
            return total;
        }, {} as Record<string, { name: string; value: string }>)
    );

    const qc = useQueryClient();
    const saveEditorContextMutation = useMutation({
        mutationFn: apiProvider.editor.saveContext,
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: [QueryKey.Editor],
            });
            qc.invalidateQueries({
                queryKey: [QueryKey.GetEditorContext],
            });
        },
    });

    const record = Object.values(context).reduce((total, pair) => {
        if (!pair.name) return total;
        total[pair.name] = pair.value;
        return total;
    }, {} as Record<string, string>);

    return (
        <div>
            <Typography.Title>Контекст</Typography.Title>
            <Form>
                <Flex vertical gap="small">
                    {Object.keys(context).map((id) => {
                        const { name, value } = context[id];
                        return (
                            <Form.Item key={id} noStyle>
                                <Flex gap={10}>
                                    <Input
                                        placeholder="Название переменной"
                                        value={name}
                                        onChange={(e) => {
                                            updateContext((draft) => {
                                                draft[id].name = e.target.value;
                                            });
                                        }}
                                    />
                                    <Input
                                        placeholder="Значение переменной"
                                        value={value}
                                        onChange={(e) => {
                                            updateContext((draft) => {
                                                draft[id].value = e.target.value;
                                            });
                                        }}
                                    />
                                    <Button
                                        danger
                                        onClick={() => {
                                            updateContext((draft) => {
                                                delete draft[id];
                                            });
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </Flex>
                            </Form.Item>
                        );
                    })}
                </Flex>
            </Form>
            <Flex gap="small" wrap="wrap" style={{ marginTop: 10 }}>
                <Button type="primary" onClick={() => saveEditorContextMutation.mutate(record)}>
                    Сохранить{" "}
                </Button>
                <Button
                    type="dashed"
                    onClick={() => {
                        updateContext((draft) => {
                            draft[uuid()] = { name: "", value: "" };
                        });
                    }}
                >
                    <PlusOutlined />
                    Добавить новое поле
                </Button>
            </Flex>
        </div>
    );
}
