import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./reducers";
import {apiMiddlewares} from "../services";

export const store = configureStore({
    reducer: rootReducer,
    middleware: gDM => gDM().concat(apiMiddlewares)
});

export type RootState = ReturnType<typeof store.getState>;