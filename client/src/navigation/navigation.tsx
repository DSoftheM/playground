import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { nav } from "./nav";
import { AppHeader } from "./app-header";
import { Menu, MenuProps } from "antd";
import { createPortal } from "react-dom";
import { NotificationView, NotificationsContainer, useNotifications } from "../features/notifications/notifications";
import { useState } from "react";
import { zIndex } from "../z-index";
import { useOutsideClick } from "../hooks/use-on-click-outside";

const Root = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
        "header header"
        "sidebar content";
    height: 100vh;

    @media (width < 600px) {
        grid-template-columns: 1fr;
    }
`;

const Header = styled.div`
    grid-area: header;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
    grid-area: sidebar;
    background-color: #000c17;
    overflow: auto;

    @media (width < 600px) {
        transition: all 0.3s ease 0s;
        transform: ${(props) => `translateX(${props.isOpen ? "0px" : "-100%"})`};
        position: absolute;
        left: 0;
        top: 60px;
        z-index: ${zIndex.Sidebar};
    }

    &::-webkit-scrollbar {
        height: 4px;
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 5px;
    }
`;

const Content = styled.div`
    padding: 10px;
    grid-area: content;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const links = [
    nav.todoList,
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
    nav.features.gameCrud.root,
    nav.features.useInfiniteQuery,
];

export function Navigation() {
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
        {
            key: "-1",
            label: "Features",
            type: "group",
            children: links.map((link, i) => ({
                key: i,
                label: link,
                onClick: () => {
                    setIsSidebarOpen(false);
                    navigate(link);
                },
            })),
        },
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

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const ref = useOutsideClick(() => setIsSidebarOpen(false));

    return (
        <Root>
            {renderNotifications()}
            <Header>
                <AppHeader onSidebarOpen={() => setIsSidebarOpen(!isSidebarOpen)} />
            </Header>
            <Sidebar isOpen={isSidebarOpen} ref={ref}>
                <Menu style={{ overflow: "auto" }} theme="dark" mode="inline" items={items} defaultOpenKeys={["-1"]} />
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
        </Root>
    );
}
