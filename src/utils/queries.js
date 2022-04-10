const CigaretteReport = require("../models/CigaretteReport");
const SeasonManager = require("../services/SeasonManager");

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
    const amountInADay = await CigaretteReport.count({
        userId,
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        season: SeasonManager.seasonNumber
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


module.exports = {getTopNSmokersInSeason,
    getMostCommonTimestampOfUser,
    getAmountInADayOfUser,
    getAveragePerDayOfUser,
    getCountOfUserThisSeason,
    getCountPerSeasonOfUser,
    getCountOfUser,
    getLastCigaretteTimeOfUser};