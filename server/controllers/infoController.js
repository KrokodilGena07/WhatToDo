import infoService from "../services/infoService.js";

class InfoController {
    async getCities(req, res, next) {
        try {
            const data = await infoService.getCities();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getCategories(req, res, next) {
        try {
            const data = await infoService.getCategories();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getConnectTypes(req, res, next) {
        try {
            const data = await infoService.getConnectTypes();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

export default new InfoController();