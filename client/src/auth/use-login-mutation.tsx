import { useMutation } from "react-query";
import { apiProvider } from "../api-provider";
import { AxiosError } from "axios";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { LoginResponse } from "@shared/types/auth/login-response";
import { useNavigate } from "react-router-dom";
import { nav } from "../navigation/nav";
import { setCookie } from "./cookie";

export function useLoginMutation() {
    const navigate = useNavigate();

    return useMutation<LoginResponse, AxiosError<string>, ILoginUser>({
        mutationFn: apiProvider.auth.login,
        onSuccess: (data) => {
            console.log("data :>> ", data);
            // localStorage.setItem("access_token", data.access_token);
            navigate(nav.main);
            // // document.cookie = `access_token=${data.access_token};httpOnly=true`;
            // setCookie("access_token", data.access_token, { expires: new Date(Date.now() * 2) });
        },
    });
}
