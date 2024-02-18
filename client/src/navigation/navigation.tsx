import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { nav } from "./nav";
import { Link } from "../ui/link";
import { AppHeader } from "./app-header";

type Props = {};

const Root = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
        "header header"
        "sidebar content";
    height: 100vh;
`;

const Header = styled.div`
    background-color: peachpuff;
    padding: 10px;
    grid-area: header;
`;

const Sidebar = styled.div`
    background-color: slateblue;
    padding: 10px;
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Content = styled.div`
    padding: 10px;
    grid-area: content;
`;

export function Navigation() {
    return (
        <Root>
            <Header>
                <AppHeader />
            </Header>
            <Sidebar>
                <Link to={nav.catsCreation}>{nav.catsCreation}</Link>
                <Link to={nav.auth.register}>{nav.auth.register}</Link>
                <Link to={nav.auth.login}>{nav.auth.login}</Link>
            </Sidebar>
            <Content>
                <Outlet />
            </Content>
        </Root>
    );
}
