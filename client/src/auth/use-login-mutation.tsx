import { useMutation, useQueryClient } from "react-query";
import { apiProvider } from "../api-provider";
import { AxiosError } from "axios";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { LoginResponse } from "@shared/types/auth/login-response";
import { useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";

export function useLoginMutation() {
    const navigate = useNavigate();

    return useMutation<LoginResponse, AxiosError<string>, ILoginUser>({
        mutationFn: apiProvider.auth.login,
        onSuccess: (data) => {
            navigate(nav.catsCreation);
        },
    });
}
