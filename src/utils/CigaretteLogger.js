const CigaretteReport = require("../models/CigaretteReport");

const logCigaretteReport = async (userId) => {
  const cigaretteReportLog = {
    month: new Date().getMonth(),
    day: new Date().getDay(),
    year: new Date().getFullYear(),
    hour: new Date().getHours(),
    userId,
  };

  try {
    const report = new CigaretteReport(cigaretteReportLog);
    await report.save();
  } catch (e) {
    console.error(e);
  }
};

module.exports = logCigaretteReport;
