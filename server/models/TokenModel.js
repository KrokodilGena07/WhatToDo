import {db} from "../config/db.js";

export class TokenModel {
    static async createToken(refreshToken, userId) {
        const sql = `INSERT INTO tokens (refreshToken, userId) VALUES (?, ?)`;
        const returning = `SELECT * FROM tokens WHERE userId = '${userId}'`;

        await db.execute(sql, [refreshToken, userId]);
        const [tokens, _] = await db.execute(returning);

        return tokens[0];
    }
    static async updateToken(token) {
        const sql = `UPDATE tokens SET refreshToken = '${token.refreshToken}' WHERE id = ${token.id}`;
        await db.execute(sql);
        return token;
    }
    static async getTokenByUserId(userId) {
        const sql = `SELECT * FROM tokens WHERE userId = '${userId}'`;
        const [tokens, _] = await db.execute(sql);
        return tokens[0];
    }

    static async getToken(refreshToken) {
        const sql = `SELECT * FROM tokens WHERE refreshToken = '${refreshToken}'`;
        const [tokens, _] = await db.execute(sql);
        return tokens[0];
    }

    static async deleteToken(refreshToken) {
        const sql = `DELETE FROM tokens WHERE refreshToken = '${refreshToken}'`;
        await db.execute(sql);
        return refreshToken;
    }
}