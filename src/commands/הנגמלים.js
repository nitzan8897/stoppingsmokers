const {getTopNSmokersInSeason} = require("../utils/queries");
const {getTopSmokersMessage} = require("../utils/functions");

module.exports.run = async (client) => {
    const mentions = [];
    const topSmokers = await getTopNSmokersInSeason(5, 1);
    for (const smoker of topSmokers) {
        smoker._id = await client.getContactById(smoker._id)
        mentions.push(smoker._id);
    }
    const message = getTopSmokersMessage(topSmokers, mentions);
    client.sendBotMessage(client.chatId, message, {mentions})
}

module.exports.config = {
    name: 'הנגמלים',
}
