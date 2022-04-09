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

module.exports = {getTopNSmokersInSeason, getMostCommonTimestampOfUser, getAmountInADayOfUser, getAveragePerDayOfUser};