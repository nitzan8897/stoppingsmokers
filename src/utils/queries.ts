import CigaretteReport from '../models/CigaretteReport'
import SeasonManager from '../services/SeasonManager'

interface TopSmoker {
    _id: string
    total: number
}

export const getTopNSmokersInSeason = async (
    n: number,
    sortDirection: number
): Promise<TopSmoker[]> => {
    const topSmokers: TopSmoker[] = await CigaretteReport.aggregate([
        { $match: { season: SeasonManager.seasonNumber } },
        { $group: { _id: '$userId', total: { $sum: 1 } } },
        { $sort: { total: sortDirection } },
        { $limit: n },
    ]).exec()

    return topSmokers
}

interface MostLovedTimestamp {
    _id: number
    total: number
}

export const getMostCommonTimestampOfUser = async (
    userId: string,
    timestamp: string,
    limit: number
): Promise<MostLovedTimestamp[]> => {
    const mostLovedTimestamp: MostLovedTimestamp[] =
        await CigaretteReport.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: timestamp, total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: limit },
        ]).exec()

    return mostLovedTimestamp
}

export const getAmountInADayOfUser = async (
    userId: string,
    date: Date
): Promise<number> => {
    const dayStartDate = new Date(date).setHours(0, 0, 0, 0)
    const dayEndDate = new Date(date).setHours(23, 59, 59, 999)

    const amountInADay: number = await CigaretteReport.count({
        date: { $lte: dayEndDate, $gte: dayStartDate },
        userId: userId,
    }).exec()

    return amountInADay
}

export const getAveragePerDayOfUser = async (
    userId: string
): Promise<number> => {
    const amountPerDay: any[] = await CigaretteReport.aggregate([
        { $match: { userId: userId } },
        {
            $group: {
                _id: {
                    year: '$year',
                    month: '$month',
                    day: '$day',
                },
                total: { $sum: 1 },
            },
        },
        {
            $group: {
                _id: '1',
                average: { $avg: '$total' },
            },
        },
    ])

    return amountPerDay[0]?.average || 0
}

export const getCountOfUserThisSeason = async (
    userId: string
): Promise<number> => {
    const amount: number = await CigaretteReport.count({
        userId: userId,
        season: SeasonManager.seasonNumber,
    }).exec()

    return amount
}

export const getCountPerSeasonOfUser = async (
    userId: string
): Promise<any[]> => {
    const amountPerSeason: any[] = await CigaretteReport.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: '$season', total: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]).exec()

    return amountPerSeason
}

export const getCountOfUser = async (userId: string): Promise<number> => {
    const count: number = await CigaretteReport.count({
        userId: userId,
    }).exec()

    return count
}

export const getLastCigaretteTimeOfUser = async (
    userId: string
): Promise<Date | null> => {
    const lastCigaretteTime = await CigaretteReport.findOne({
        userId: userId,
    })
        .sort({ date: -1 })
        .select('date')
        .exec()

    return lastCigaretteTime?.date || null
}

export const insertReportManually = async (
    userId: string,
    date: Date,
    season: number
): Promise<void> => {
    const cigaretteReportLog = {
        month: new Date(date).getMonth(),
        day: new Date(date).getDay(),
        year: new Date(date).getFullYear(),
        hour: new Date(date).getHours(),
        date: new Date(date),
        userId,
        season,
    }

    try {
        const report = new CigaretteReport(cigaretteReportLog)
        await report.save()
    } catch (e) {
        console.error(e)
    }
}
