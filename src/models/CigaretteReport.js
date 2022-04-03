const mongoose = require("mongoose");

const CigaretteReport = mongoose.model("CigaretteReport", {
  userId: String,
  hour: Number,
  day: Number,
  month: Number,
  year: Number,
  date: Date,
  season: Number
});

module.exports = CigaretteReport;
