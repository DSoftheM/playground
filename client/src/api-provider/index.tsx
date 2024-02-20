import { LoginResponse } from "@shared/types/auth/login-response";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { IUser } from "@shared/types/auth/user.interface";
import { IRegisterUser } from "@shared/types/auth/register-user.interface";
import { httpClient } from "./axios";
import { Cat } from "../cats-creation";

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
    cats: {
        async create(cat: Cat) {
            (await httpClient.post<void>("/cats/create", cat)).data;
        },
        async getAll() {
            return (await httpClient.get<Cat[]>("/cats")).data;
        },
        async delete(id: number) {
            return (await httpClient.get<void>("/cats/delete", { params: { id } })).data;
        },
    },
    async getAllUsers() {
        return (await httpClient.get<IUser[]>("/users")).data;
    },
};
