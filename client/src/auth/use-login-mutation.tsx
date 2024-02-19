import { useMutation, useQueryClient } from "react-query";
import { apiProvider } from "../api-provider";
import { AxiosError } from "axios";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { LoginResponse } from "@shared/types/auth/login-response";

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, AxiosError<string>, ILoginUser>({
        mutationFn: apiProvider.auth.login,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: "profile",
            });
        },
    });
}
