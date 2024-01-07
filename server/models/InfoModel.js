import {db} from "../config/db.js";

export class InfoModel {
    static async getCities() {
        const sql = `SELECT * FROM cities ORDER BY id`;
        const [data, _] = await db.execute(sql);
        return data;
    }

    static async getCategories() {
        const sql = `SELECT * FROM categories ORDER BY id`;
        const [data, _] = await db.execute(sql);
        return data;
    }

    static async getConnectTypes() {
        const sql = `SELECT * FROM connect_types ORDER BY id`;
        const [data, _] = await db.execute(sql);
        return data;
    }
}