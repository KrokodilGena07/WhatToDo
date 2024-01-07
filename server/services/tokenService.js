import jwt from 'jsonwebtoken';
import {TokenModel} from "../models/TokenModel.js";

class TokenService {
    generateTokens(payload) {
        return {
            refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'}),
            accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'})
        };
    }

    async saveToken(refreshToken, userId) {
        const token = await TokenModel.getTokenByUserId(userId);
        if (token) {
            token.refreshToken = refreshToken;
            return await TokenModel.updateToken(token);
        }
        return await TokenModel.createToken(refreshToken, userId);
    }

    #validateToken(token, secretKey) {
        try {
            return jwt.verify(token, secretKey);
        } catch (e) {
            return null;
        }
    }

    validateAccessToken(accessToken) {
        return this.#validateToken(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
    }

    validateRefreshToken(refreshToken) {
        return this.#validateToken(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    }

    async findToken(refreshToken) {
        return await TokenModel.getToken(refreshToken);
    }

    async removeToken(refreshToken) {
        return await TokenModel.deleteToken(refreshToken);
    }
}

export default new TokenService();