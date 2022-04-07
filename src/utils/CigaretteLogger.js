const CigaretteReport = require('../models/CigaretteReport')
const SeasonManager = require('./SeasonManager')

// const incrementUserAmountInSeason = async (author) => {
//   await SeasonMember.updateOne({season: SeasonManager.seasonNumber, userId: author}, {$inc: {amount: 1}});
// }

const logCigaretteReport = async (userId) => {
    const cigaretteReportLog = {
        month: new Date().getMonth() + 1, // js Date.getMonth returns from 0.
        day: new Date().getDay() + 1, // same here
        year: new Date().getFullYear(),
        hour: new Date().getHours(),
        date: new Date(),
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
