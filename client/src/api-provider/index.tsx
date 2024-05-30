import { LoginResponse } from "@shared/types/auth/login-response";
import { ILoginUser } from "@shared/types/auth/login-user.interface";
import { IUser } from "@shared/types/auth/user.interface";
import { IRegisterUser } from "@shared/types/auth/register-user.interface";
import { httpClient } from "./axios";
import { ICatView } from "@shared/types/cats/cat-view.interface";
import { ICatCreate } from "@shared/types/cats/cat-create.interface";
import { IUserDTO } from "@shared/types/auth/temp-user";
import { IPlayerCreate } from "@shared/types/game-crud/player-create.interface";
import { Todo } from "../features/use-infinite-query/use-infinite-query";

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
                return (await httpClient.get<IUserDTO>("settings/profile")).data;
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
        async getPdf(templateString: string) {
            return (await httpClient.post<string>("/editor/getPdf", { text: templateString })).data;
        },
        async saveContext(context: Record<string, string>) {
            return (await httpClient.post<string>("/editor/saveContext", { context })).data;
        },
        async getContext() {
            return (await httpClient.get<Record<string, string>>("/editor/getContext")).data;
        },
    },
    profile: {
        async uploadAvatar(formData: FormData) {
            return await httpClient.post<void>("/profile/uploadAvatar", formData);
        },
    },
    features: {
        jsonPlaceholder: {
            async todos(data: { skip: number; count: number }) {
                const todos: Todo[] = (
                    await httpClient.get("https://jsonplaceholder.typicode.com/todos", { baseURL: "", params: data })
                ).data;
                return todos.slice(data.skip, data.skip + data.count);
            },
        },
        mediaViewer: {
            async getSamplePdf(type: "link" | "stream") {
                return (await httpClient.get("/mediaViewer/getPdf", { params: { type } })).data;
            },
            async getBinaryImage(url: string) {
                return (await httpClient.get(url)).data;
            },
        },
        gameCrud: {
            async createPlayer(data: IPlayerCreate) {
                return (await httpClient.post("/game-crud/createPlayer", data)).data;
            },
            async deletePlayer(playerId: string) {
                return (await httpClient.post("/game-crud/deletePlayer", { playerId })).data;
            },
            async getAllPlayers() {
                return (await httpClient.get("/game-crud/getAllPlayers")).data;
            },
            async getPlayer(id: string) {
                return (await httpClient.get(`/game-crud/1getPlayer/${id}`)).data;
            },
        },
    },
};
