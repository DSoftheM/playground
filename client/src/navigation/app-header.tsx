import { Avatar, Button } from "antd";
import styled from "styled-components";
import { useLogoutMutation } from "../auth/use-logout-mutation";

type Props = {};

const Root = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    background-color: sienna;
    height: 100%;
`;

export function AppHeader(props: Props) {
    const logoutMutation = useLogoutMutation();
    return (
        <Root>
            <Avatar />
            <Button onClick={() => logoutMutation.mutate()}>Выйти</Button>
        </Root>
    );
}
