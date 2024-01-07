import {db} from "../config/db.js";

export class ClubModel {
    static async createClub({title, description, source, phone, ownerId, price, connect, city, category}) {
        const sql = `INSERT INTO clubs 
        (title, description, source, phone, ownerId, price, connect, city, category) VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.execute(sql, [title, description, source, phone, ownerId, price, connect, city, category]);
        return ownerId;
    }

    static async setClubImage(img, id) {
        const sql = `UPDATE clubs SET image = ? WHERE id = ?`;
        await db.execute(sql, [img.image.data, id]);
        return id;
    }

    static async getClubs(filter) {
        const sql = `SELECT * FROM clubs`;
        const [clubs, _] = await db.execute(sql);
        return clubs.filter(filter);
    }

    static async getClub(id) {
        const sql = `SELECT * FROM clubs WHERE id = '${id}'`;
        const [clubs, _] = await db.execute(sql);
        return clubs[0];
    }

    static async deleteClub(id) {
        const sql = `DELETE FROM clubs WHERE id = '${id}'`;
        await db.execute(sql);
        return id;
    }
}