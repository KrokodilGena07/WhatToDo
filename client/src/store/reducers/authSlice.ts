import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {AuthResponse} from "../../models/AuthResponse";

interface AuthState {
    user: IUser | null;
    accessToken: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('User') || 'null'),
    accessToken: localStorage.getItem('Token')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthResponse>) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('User', JSON.stringify(state.user));
            localStorage.setItem('Token', state.accessToken);
        },
        removeUser(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('User');
            localStorage.removeItem('Token');
        }
    }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;