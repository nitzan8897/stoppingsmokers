const mongoose = require("mongoose");

const HistoryReport = mongoose.model("HistoryReport", {
    userId: String,
    reports: Array
});

module.exports = HistoryReport;
