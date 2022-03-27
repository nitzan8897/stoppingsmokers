const mongoose = require('mongoose');

const CigaretteReport = mongoose.model('CigaretteReport', {
    userId: String,
    hour: Number,
    day: Number,
    month: Number,
    year: Number
});

module.exports = CigaretteReport;