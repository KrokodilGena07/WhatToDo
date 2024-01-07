import {validationResult} from "express-validator";
import {ApiError} from "../error/ApiError.js";
import clubService from "../services/clubService.js";

class ClubController {
    async createClub(req, res, next) {
        try {
            const body = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const club = await clubService.createClub(body);
            res.json(club);
        } catch (e) {
            next(e);
        }
    }

    async setClubImage(req, res, next) {
        try {
            const {id} = req.body;
            const img = req.files;

            if (!id || !img) {
                return next(ApiError.badRequest('check image please'));
            }

            await clubService.setClubImage(img, id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }

    async getClubs(req, res, next) {
        try {
            const {connect, city, category, search} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const clubs = await clubService.getClubs(connect, city, category, search);
            res.json(clubs);
        } catch (e) {
            next(e);
        }
    }

    async getClub(req, res, next) {
        try {
            const id = req.params.id;
            const club = await clubService.getClub(id);
            res.json(club);
        } catch (e) {
            next(e);
        }
    }

    async deleteClub(req, res, next) {
        try {
            const id = req.params.id;
            await clubService.deleteClub(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

export default new ClubController();