const {MessageMedia} = require("whatsapp-web.js");
const {getTopNSmokersInSeason} = require("../utils/queries");

module.exports.run = async (client) => {
    const message = 'אותו תזכרו למה לכו תדעו מה יהיה איתו, ';
    const cancerIdAndAmount = await getTopNSmokersInSeason(1, -1);
    const cancerImageUrl = await client.getProfilePicUrl(cancerIdAndAmount[0]._id);
    const cancerImage = await MessageMedia.fromUrl(cancerImageUrl);
    const cancerContact = await client.getContactById(cancerIdAndAmount[0]._id);

    client.sendBotMessage(
        client.chatId,
        `${message} @${cancerContact.id.user} , עישן בסיזן הזה ${cancerIdAndAmount[0].total} סיגריות`,
        {media: cancerImage, mentions: [cancerContact]}
    );
};

module.exports.config = {
    name: "🦀"
};
