import {ClubModel} from "../models/ClubModel.js";
import {ClubDto} from "../dtos/ClubDto.js";

class ClubService {
    async createClub(data) {
        return await ClubModel.createClub(data);
    }

    async setClubImage(img, id) {
        return await ClubModel.setClubImage(img, id);
    }

    async getClubs(connect, city, category, search) {
        const clubs = await ClubModel.getClubs(club => {
            const categoryFlag = category === 'default' ? true : club.category === category;
            const cityFlag = city === 'default' ? true : club.city === city;
            const connectFlag = connect === 'default' ? true : club.connect === connect;
            const searchFlag = !!search ? club.description.toLowerCase().includes(search.toLowerCase()): true;

            return categoryFlag && cityFlag && connectFlag && searchFlag;
        });
        return clubs.map(club => new ClubDto(club));
    }

    async getClub(id) {
        const club = await ClubModel.getClub(id);
        return club ? new ClubDto(club) : null;
    }

    async deleteClub(id) {
        return await ClubModel.deleteClub(id);
    }
}

export default new ClubService();