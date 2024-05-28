import { useMutation } from "@tanstack/react-query";
import { apiProvider } from "../api-provider";
import { AxiosError } from "axios";
import { IRegisterUser } from "@shared/types/auth/register-user.interface";

export function useRegisterMutation() {
    return useMutation<void, AxiosError<string>, IRegisterUser>({
        mutationFn: apiProvider.auth.register,
    });
}
