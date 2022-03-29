const mongoose = require("mongoose");

const SeasonMember = mongoose.model("SeasonMember", {
    season: Number,
    userId: String,
    amount: Number
});

module.exports = SeasonMember;
