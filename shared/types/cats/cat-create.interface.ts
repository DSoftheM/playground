import { IUser } from "../auth/user.interface";

export interface ICatCreate {
    firstName: string;
    lastName: string;
    isActive: boolean;
    masterId: number;
}
