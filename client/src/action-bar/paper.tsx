import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
    indent: number;
};

const Root = styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background-color: #fff;
`;

export function Paper(props: PropsWithChildren<Props>) {
    return <Root style={{ padding: props.indent }}>{props.children}</Root>;
}
