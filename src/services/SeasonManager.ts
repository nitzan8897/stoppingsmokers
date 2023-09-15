import { consoleColorCodes } from '../../config/consts'
import Season, { ISeason } from '../models/Season'

class SeasonManager {
    static seasonTimeInDays: number = 7
    static seasonNumber: number
    static seasonEnd: Date

    static async init(): Promise<void> {
        const season: ISeason | null = await Season.findOne({
            dateStart: { $lt: new Date() },
            dateEnd: { $gt: new Date() },
        }).exec()
        if (season) {
            this.seasonNumber = season.number
            this.seasonEnd = season.dateEnd
            console.log(
                consoleColorCodes.boldGreen,
                `{ SeasonManager: Initialized SeasonManager with season number: ${this.seasonNumber} } `
            )
            return
        }

        await this.createNewSeason()
    }

    static async createNewSeason(): Promise<void> {
        const lastSeasons: ISeason[] = await Season.find()
            .sort({ dateEnd: -1 })
            .exec()
        const lastSeasonNumber: number = lastSeasons[0]?.number || 0
        const now: Date = new Date()
        this.seasonNumber = lastSeasonNumber + 1
        this.seasonEnd = new Date(
            now.getTime() + this.seasonTimeInDays * 24 * 60 * 60 * 1000
        )
        const newSeason = new Season({
            number: this.seasonNumber,
            dateStart: new Date(),
            dateEnd: this.seasonEnd,
        })
        await newSeason.save()
    }
}

export default SeasonManager
