import {InfoModel} from "../models/InfoModel.js";

class InfoService {
    async getCities() {
        return await InfoModel.getCities();
    }

    async getCategories() {
        return await InfoModel.getCategories();
    }

    async getConnectTypes() {
        return await InfoModel.getConnectTypes();
    }
}

export default new InfoService();