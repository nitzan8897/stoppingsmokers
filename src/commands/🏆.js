const {MessageMedia} = require("whatsapp-web.js");
const {getTopNSmokersInSeason} = require("../utils/queries");

module.exports.run = async (client) => {
    const message = 'זה הילד הטוב שלנו, ';
    const winnerIdAndAmount = await getTopNSmokersInSeason(1, 1);
    const winnerImageUrl = await client.getProfilePicUrl(winnerIdAndAmount[0]._id);
    const winnerImage = await MessageMedia.fromUrl(winnerImageUrl);
    const winnerContact = await client.getContactById(winnerIdAndAmount[0]._id);
    
    client.sendBotMessage(
        client.chatId,
        `${message} @${winnerContact.id.user} תמשיך ככה, אולי יצא ממך משהו, עישנת בסיזן הזה רק ${winnerIdAndAmount[0].total}`,
        {media: winnerImage, mentions: [winnerContact]}
    );
};

module.exports.config = {
    name: "🏆"
};
