import {IUser} from "./IUser";

export interface AuthResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}