const CigaretteReport = require("../models/CigaretteReport");
const SeasonMember = require("../models/SeasonMember");
const SeasonHandler = require("./SeasonHandler");

const incrementUserAmountInSeason = async (author) => {
  await SeasonMember.updateOne({season: SeasonHandler.seasonNumber, userId: author}, {$inc: {amount: 1}});
}

const logCigaretteReport = async (userId) => {
  const cigaretteReportLog = {
    month: new Date().getMonth(),
    day: new Date().getDay(),
    year: new Date().getFullYear(),
    hour: new Date().getHours(),
    date: new Date(),
    userId,
    season: SeasonHandler.seasonNumber
  };

  try {
    await incrementUserAmountInSeason();
    const report = new CigaretteReport(cigaretteReportLog);
    await report.save();
  } catch (e) {
    console.error(e);
  }
};

module.exports = logCigaretteReport;
