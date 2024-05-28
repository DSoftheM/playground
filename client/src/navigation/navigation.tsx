import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { nav } from "./nav";
import { Link } from "../ui/link";
import { AppHeader } from "./app-header";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuProps } from "antd";
import { createNanoEvents } from "nanoevents";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { createPortal } from "react-dom";
import {
    Notification,
    NotificationView,
    NotificationsContainer,
    useNotifications,
} from "../features/notifications/notifications";

type Props = {};

const Root = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
        "header header"
        "sidebar content";
    height: 100vh;
`;

const Header = styled.div`
    grid-area: header;
`;

const Sidebar = styled.div`
    grid-area: sidebar;
    background-color: slateblue;
    padding: 10px;
    /* 
    display: flex;
    flex-direction: column;
    gap: 10px; */
`;

const Content = styled.div`
    padding: 10px;
    grid-area: content;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const links = [
    nav.catsCreation,
    nav.auth.register,
    nav.auth.login,
    nav.allUsers,
    nav.editor,
    nav.profile,
    nav.actionBar,
    nav.tabs,
    nav.cloud,
    nav.maze,
    nav.virtualList,
    nav.mediaViewer,
    nav.gameCrud,
    nav.features.useInfiniteQuery,
];

export function Navigation() {
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
        { key: -1, label: "Test", children: links.map((link, i) => ({ key: i, label: link, onClick: () => navigate(link) })) },
    ];

    const { notifications } = useNotifications();
    const renderNotifications = () => {
        return createPortal(
            <NotificationsContainer>
                {notifications.map((n) => (
                    <NotificationView key={n.id} notification={n} />
                ))}
            </NotificationsContainer>,
            document.body
        );
    };

    return (
        <Root>
            {renderNotifications()}
            <Header>
                <AppHeader />
            </Header>
            <Sidebar>
                <Sider>
                    <Menu mode="inline" items={items} />
                </Sider>
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
        </Root>
    );
}
