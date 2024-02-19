import { PropsWithChildren } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { useProfileQuery } from "../auth/use-profile-query";

type Props = {};

export function WithAuth(props: PropsWithChildren) {
    const profileQuery = useProfileQuery();

    if (profileQuery.isLoading) return "Loading...";
    if (!profileQuery.data) {
        return <Navigate to={nav.auth.login} />;
    }

    return <Outlet />;
}
