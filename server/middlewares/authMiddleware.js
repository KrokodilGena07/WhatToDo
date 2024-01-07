import {ApiError} from "../error/ApiError.js";
import tokenService from "../services/tokenService.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized());
        }

        next();
    } catch (e) {
        return next(ApiError.unauthorized());
    }
};