const Season = require("../models/Season");

class SeasonManager {
    static seasonTimeInDays = 7;
    static seasonNumber;
    static seasonEnd;

    static async init() {
        const season = await Season.findOne({ dateStart: {$lt: new Date()}, dateEnd: {$gt: new Date()}}).exec();
        if (season) {
            this.seasonNumber = season.number;
            this.seasonEnd = season.dateEnd;
            console.log("Started SeasonManager with season number: " + this.seasonNumber);
            return;
        }

        await this.createNewSeason();
    }

    static async createNewSeason() {
        const lastSeason = await Season.find().sort({dateEnd: -1}).exec();
        const lastSeasonNumber = lastSeason[0].number || 0;
        const now = new Date();
        this.seasonNumber = lastSeasonNumber + 1;
        this.seasonEnd = new Date(now.getTime() + this.seasonTimeInDays * 24 * 60 * 60 * 1000);
        const newSeason = new Season({ number: this.seasonNumber, dateStart: new Date(), dateEnd: this.seasonEnd});
        await newSeason.save();
    }
}

module.exports = SeasonManager;