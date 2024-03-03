import { LoginResponse } from "@shared/types/auth/login-response";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { IUser } from "@shared/types/auth/user.interface";
import { IRegisterUser } from "@shared/types/auth/register-user.interface";
import { httpClient } from "./axios";
import { ICatView } from "@shared/types/cats/cat-view.interface";
import { ICatCreate } from "@shared/types/cats/cat-create.interface";

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
                return (await httpClient.get<ILoginUser>("settings/profile")).data;
            },
        },
    },
    cats: {
        async create(cat: ICatCreate) {
            return (await httpClient.post<string>("/cats/create", cat)).data;
        },
        async getAll() {
            return (await httpClient.get<ICatView[]>("/cats")).data;
        },
        async delete(id: string) {
            return (await httpClient.get<void>("/cats/delete", { params: { id } })).data;
        },
    },
    async getAllUsers() {
        return (await httpClient.get<IUser[]>("/users")).data;
    },
    editor: {
        async getHtml(templateString: string) {
            return (await httpClient.post<string>("/editor/getHtml", { text: templateString })).data;
        },
    },
};
