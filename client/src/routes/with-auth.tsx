import { PropsWithChildren } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";

type Props = {};

export function WithAuth(props: PropsWithChildren) {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
        return <Navigate to={nav.auth.login} />;
    }

    return <Outlet />;
}
