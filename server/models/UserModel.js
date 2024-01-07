import {db} from "../config/db.js";

export class UserModel {
    static async createUser(username, password, email, activationLink) {
        const sql = `INSERT INTO users (username, password, email, activationLink) VALUES (?, ?, ?, ?)`;
        const returning = `SELECT * FROM users WHERE email = '${email}'`;

        await db.execute(sql, [username, password, email, activationLink]);
        const [users, _] = await db.execute(returning);

        return users[0];
    }

    static async updateUser({username, isActivated, id}) {
        const sql = `UPDATE users SET username = ?, isActivated = ? WHERE id = ?`;
        const returning = `SELECT * FROM users WHERE id = '${id}'`;

        await db.execute(sql, [username, isActivated, id]);
        const [users, _] = await db.execute(returning);

        return users[0];
    }

    static async getUserByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        const [users, _] = await db.execute(sql);
        return users[0];
    }

    static async getUserByLink(link) {
        const sql = `SELECT * FROM users WHERE activationLink = '${link}'`;
        const [users, _] = await db.execute(sql);
        return users[0];
    }
}