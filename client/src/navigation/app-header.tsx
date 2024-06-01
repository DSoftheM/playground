import { Avatar, Button } from "antd";
import { useLogoutMutation } from "../auth/use-logout-mutation";
import { useProfileQuery } from "../auth/use-profile-query";
import { getRefreshImage } from "../lib/image";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Icon = styled(MenuOutlined)`
    color: #fff;
    font-size: 24px;
    display: none;

    @media (width < 600px) {
        display: block;
    }
`;

const Line = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

type AppHeaderProps = {
    onSidebarOpen: () => void;
};

export function AppHeader(props: AppHeaderProps) {
    const logoutMutation = useLogoutMutation();
    const profileQuery = useProfileQuery();

    if (!profileQuery.data?.url) return;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                backgroundColor: "#2b223d",
                height: "100%",
            }}
        >
            <Line>
                <Icon onClick={props.onSidebarOpen} />
                <Avatar style={{ backgroundColor: "#f56a00" }} src={getRefreshImage(profileQuery.data.url)} />
            </Line>
            <Button type="primary" loading={logoutMutation.isPending} onClick={() => logoutMutation.mutate()}>
                Выйти
            </Button>
        </div>
    );
}
