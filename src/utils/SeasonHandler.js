const Season = require("../models/Season");

class SeasonHandler {
    static seasonNumber;
    static seasonEnd;

    constructor() {
    }

    static async init() {
        const season = await Season.findOne({ dateStart: {$lt: new Date()}, dateEnd: {$gt: new Date()}}).exec();
        if (season) {
            this.seasonNumber = season.number;
            this.seasonEnd = season.dateEnd;
        }

        await this.createNewSeason();
    }

    static async createNewSeason() {
        const lastSeason = await Season.find({$orderby: { dateEnd: -1}}).exec();
        const lastSeasonNumber = lastSeason.number || 0;
        const now = new Date();
        this.seasonNumber = lastSeasonNumber + 1;
        this.seasonEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        const newSeason = new Season({ number: this.seasonNumber, dateStart: new Date(), dateEnd: this.seasonEnd});
        await newSeason.save();
    }
}

module.exports = SeasonHandler;