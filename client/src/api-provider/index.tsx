import { LoginResponse } from "@shared/types/auth/login-response";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { IRegisterUser } from "@shared/types/auth/register-user.interface";
import { httpClient } from "./axios";

export const apiProvider = {
    auth: {
        async login(loginDto: ILoginUser) {
            return (await httpClient.post<LoginResponse>("/auth/login", loginDto)).data;
        },
        async logout() {
            return (await httpClient.get<void>("/auth/logout")).data;
        },
        async register(registerDto: IRegisterUser) {
            return (await httpClient.post<void>("/auth/register", registerDto)).data;
        },
        settings: {
            async get() {
                return (await httpClient.get<void>("settings/profile")).data;
            },
        },
    },
};
