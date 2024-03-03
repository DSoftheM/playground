import { Editor } from "@monaco-editor/react";
import { useQuery } from "react-query";
import { apiProvider } from "./api-provider";
import { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, Typography } from "antd";
import { useImmer } from "use-immer";
import useDebounce from "./hooks/use-debounce";

const Body = styled.div`
    display: flex;
    gap: 10px;
    min-height: 600px;

    & > * {
        flex-basis: 50%;
        border: 1px solid #000;
    }
`;

export function MonacoEditor() {
    const [text, setText] = useState("");
    const debouncedText = useDebounce(text, 300);

    const templateQuery = useQuery({
        queryFn: () => apiProvider.editor.getHtml(text),
        queryKey: ["editor", debouncedText],
    });

    const [context, updateContext] = useImmer<Record<string, string>>({});

    console.log(context);

    return (
        <div>
            <Typography.Title>Контекст</Typography.Title>
            <Form>
                {Object.values(context).map((pair) => {
                    const [key, value] = pair;
                    return (
                        <Form.Item key={key}>
                            <Input
                                placeholder="Название переменной"
                                value={key}
                                onChange={(e) => {
                                    updateContext((draft) => {
                                        // draft[]
                                    });
                                }}
                            />
                            <Input placeholder="Значение переменной" value={value} onChange={console.log} />
                        </Form.Item>
                    );
                })}
            </Form>
            <Button
                onClick={() => {
                    updateContext((draft) => {
                        draft[""] = "";
                    });
                }}
            >
                Добавить
            </Button>
            <Body>
                <div>
                    <Editor value={text} language="handlebars" onChange={(x) => setText(x ?? "")} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: templateQuery.data ?? "" }}></div>
            </Body>
        </div>
    );
}
