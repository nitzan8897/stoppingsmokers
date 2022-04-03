const mongoose = require("mongoose");

const Season = mongoose.model("Season", {
    number: Number,
    dateStart: Date,
    dateEnd: Date,
});

module.exports = Season;
