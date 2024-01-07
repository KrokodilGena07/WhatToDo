import {services} from "../../services";
import {authActions, authReducer} from "./authSlice";

export const rootReducer = {
    auth: authReducer,
    ...services
};

export const actionCreators = {
    ...authActions
};