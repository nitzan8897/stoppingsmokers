const CigaretteReport = require('../models/CigaretteReport')
const SeasonManager = require('./SeasonManager')

// const incrementUserAmountInSeason = async (author) => {
//   await SeasonMember.updateOne({season: SeasonManager.seasonNumber, userId: author}, {$inc: {amount: 1}});
// }

const logCigaretteReport = async (userId, date) => {
    const cigaretteReportLog = {
        month: date.getMonth(), // js Date.getMonth returns from 0.
        day: date.getDay(), // same here
        year: date.getFullYear(),
        hour: date.getHours(),
        date: date,
        userId,
        season: SeasonManager.seasonNumber,
    }

    try {
        // await incrementUserAmountInSeason();
        const report = new CigaretteReport(cigaretteReportLog)
        await report.save()
    } catch (e) {
        console.error(e)
    }
}

module.exports = logCigaretteReport
