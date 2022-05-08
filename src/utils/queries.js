const CigaretteReport = require("../models/CigaretteReport");
const SeasonManager = require("../services/SeasonManager");
const HistoryReport = require("../models/HistoryReports");

const getTopNSmokersInSeason = async (n, sortDirection) => {
    const topSmokers = await CigaretteReport.aggregate([
        {$match: {season: SeasonManager.seasonNumber}},
        {$group: {_id: '$userId', total: {$sum: 1}}},
        {$sort: {total: sortDirection}},
        {$limit: n}
    ]).exec();

    return topSmokers;
}

const getMostCommonTimestampOfUser = async (userId, timestamp, limit) => {
    const mostLovedTimestamp = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {$group: {_id: timestamp, total: {$sum: 1}}},
        {$sort: {total: -1}},
        {$limit: limit}
    ]).exec();

    return mostLovedTimestamp;
}

const getAmountInADayOfUser = async (userId, date) => {
    const dayStartDate = new Date(date).setHours(0, 0, 0, 0);
    const dayEndDate = new Date(date).setHours(23, 59, 59, 999);

    const amountInADay = await CigaretteReport.count({
        date: { $lte: dayEndDate, $gte: dayStartDate },
        userId: userId
    }).exec();

    return amountInADay;
}

const getAveragePerDayOfUser = async (userId) => {
    const amountPerDay = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {
            $group: {
                _id: {
                    year: '$year',
                    month: '$month',
                    day: '$day'
                },
                total: {$sum: 1},
            }
        },
        {$group :
                {
                    _id: "1",
                    average: {$avg:"$total"},
                }
        }
    ]);

    return amountPerDay[0].average;
}

const getCountOfUserThisSeason = async (userId) => {
    const amount = await CigaretteReport.count({
        userId: userId,
        season: SeasonManager.seasonNumber
    }).exec();

    return amount;
}

const getCountPerSeasonOfUser = async (userId) => {
    const amountPerSeason = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {$group: {_id: '$season', total: {$sum: 1}}},
        {$sort: {_id: 1}}
    ]).exec();

    return amountPerSeason;
}

const getCountOfUser = async (userId) => {
    const count = await CigaretteReport.count({'userId': userId}).exec();

    return count;
}

const getLastCigaretteTimeOfUser = async (userId) => {
    const lastCigaretteTime = await CigaretteReport.findOne({'userId': userId}).sort({date: -1}).select('date').exec();

    return lastCigaretteTime;
}

const insertReportManually = async (userId, date, season) => {
    const cigaretteReportLog = {
        month: new Date(date).getMonth(),
        day: new Date(date).getDay(),
        year: new Date(date).getFullYear(),
        hour: new Date(date).getHours(),
        date: new Date(date),
        userId,
        season
    }

    try {
        const report = new CigaretteReport(cigaretteReportLog)
        await report.save()
    } catch (e) {
        console.error(e)
    }
}

const removeAllReportsOfUser = async (userId) => {
    const allReportsQuery = await CigaretteReport.find({ 'userId': userId }).exec();
    const historyReportsOfUser = await HistoryReport.find({'userId': userId}).exec();

    if (historyReportsOfUser) {
        const mergedReports = [...allReportsQuery, ...historyReportsOfUser];
        await HistoryReport.findOneAndUpdate({'userId': userId}, {$set: {'reports': mergedReports}});
    } else {
        const historyReport = new HistoryReport({userId, reports: allReportsQuery});
        await historyReport.save();
    }

    await CigaretteReport.find({ 'userId': userId }).delete().exec();
}

const tryToRecoverReportsOfUser = async (userId) => {
    const userReports = await HistoryReport.find({'userId': userId});

    if (!userReports) return;

    userReports.forEach((userReport) => {
        new CigaretteReport(userReport).save()
    })
}

module.exports = {getTopNSmokersInSeason,
    getMostCommonTimestampOfUser,
    getAmountInADayOfUser,
    getAveragePerDayOfUser,
    getCountOfUserThisSeason,
    getCountPerSeasonOfUser,
    getCountOfUser,
    getLastCigaretteTimeOfUser,
    insertReportManually,
    removeAllReportsOfUser,
    tryToRecoverReportsOfUser};