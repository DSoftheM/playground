import { Avatar, Button, Layout, Menu } from "antd";
import { useLogoutMutation } from "../auth/use-logout-mutation";
import { useProfileQuery } from "../auth/use-profile-query";
import { getRefreshImage } from "../lib/image";

export function AppHeader() {
    const logoutMutation = useLogoutMutation();
    const profileQuery = useProfileQuery();

    if (!profileQuery.data?.url) return;

    return (
        <Layout.Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <Avatar style={{ backgroundColor: "#f56a00" }} src={getRefreshImage(profileQuery.data.url)} />
                <Menu mode="horizontal" />
            </div>
            <Button type="primary" loading={logoutMutation.isLoading} onClick={() => logoutMutation.mutate()}>
                Выйти
            </Button>
        </Layout.Header>
    );
}
