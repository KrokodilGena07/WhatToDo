export interface IUser {
    id: number;
    username: string;
    email: string;
    isActivated: number;
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}