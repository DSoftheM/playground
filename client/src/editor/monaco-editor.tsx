import { Editor } from "@monaco-editor/react";
import { useMutation, useQuery } from "react-query";
import { apiProvider } from "../api-provider";
import { useState } from "react";
import styled from "styled-components";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useImmer } from "use-immer";
import useDebounce from "../hooks/use-debounce";
import { uuid } from "../lib/uuid";
import { EditorContext } from "./editor-context";
import { QueryKey } from "../query-key";

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
        queryKey: [QueryKey.Editor, debouncedText],
    });

    const getEditorContextQuery = useQuery({
        queryKey: [QueryKey.GetEditorContext],
        queryFn: apiProvider.editor.getContext,
    });

    return (
        <div>
            <Flex gap="large" vertical>
                {getEditorContextQuery.data && <EditorContext initialContext={getEditorContextQuery.data} />}
                <Body>
                    <div>
                        <Editor
                            value={text}
                            loading={<Typography.Text>Загрузка...</Typography.Text>}
                            language="handlebars"
                            onChange={(x) => setText(x ?? "")}
                        />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: templateQuery.data ?? "" }}></div>
                </Body>
            </Flex>
        </div>
    );
}
