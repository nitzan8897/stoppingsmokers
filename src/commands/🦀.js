const CigaretteReport = require("../models/CigaretteReport");
const {MessageMedia} = require("whatsapp-web.js");

module.exports.run = async (client, message, args) => {
    try {
        const message = 'אותו תזכרו למה לכו תדעו מה יהיה איתו, ';
        const cancerIdAndAmount = await CigaretteReport.aggregate([
            { $group: { _id: '$userId', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 1}
        ]).exec();
        const cancerImageUrl = await client.getProfilePicUrl(cancerIdAndAmount[0]._id);
        const cancerImage = MessageMedia.fromUrl(cancerImageUrl);
        const cancerContact = await client.getContactById(cancerIdAndAmount[0]._id);

        client.sendBotMessage(
            client.chatId,
            `${message} @${cancerContact.id.user} , תמשיך ככה אולי יצא ממך משהו`,
            { media: cancerImage, mentions: [cancerContact] }
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
        );
    }
};

module.exports.config = {
    name: "🦀"
};
