import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiProvider } from "../api-provider";
import { useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { QueryKey } from "../query-key";

export function useLogoutMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiProvider.auth.logout,
        onSuccess() {
            queryClient.setQueryData([QueryKey.Profile], undefined);
            navigate(nav.auth.login);
        },
    });
}
