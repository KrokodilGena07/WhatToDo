import {UserModel} from "../models/UserModel.js";
import {ApiError} from "../error/ApiError.js";
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import mailService from "./mailService.js";
import {UserDto} from "../dtos/UserDto.js";
import tokenService from "./tokenService.js";

class AuthService {
    async registration(username, email, password) {
        const candidate = await UserModel.getUserByEmail(email);
        if (candidate) {
            throw ApiError.badRequest('user with this email already has been');
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuid.v4();

        const user = await UserModel.createUser(username, hashPassword, email, activationLink);
        const link = `${process.env.API_URL}/api/auth/activate/${activationLink}`;
        await mailService.sendActivationMail(email, link);

        return await this.#finishAuth(user);
    }

    async login(email, password) {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw ApiError.badRequest('user with this email not found');
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.badRequest('wrong password');
        }

        return await this.#finishAuth(user);
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async activate(link) {
        const user = await UserModel.getUserByLink(link);
        if (!user) {
            throw ApiError.badRequest('wrong activation link');
        }
        user.isActivated = 1;
        return await UserModel.updateUser(user);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!tokenFromDB || !userData) {
            throw ApiError.unauthorized();
        }

        const user = await UserModel.getUserByEmail(userData.email);
        return await this.#finishAuth(user);
    }

    async #finishAuth(user) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(tokens.refreshToken, userDto.id);
        return {...tokens, user: userDto};
    }
}

export default new AuthService();