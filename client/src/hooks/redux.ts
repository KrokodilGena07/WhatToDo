import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actionCreators} from "../store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators, dispatch);
};