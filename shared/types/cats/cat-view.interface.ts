import { IUser } from "../auth/user.interface";

export interface ICatView {
    id: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    master: IUser;
}
