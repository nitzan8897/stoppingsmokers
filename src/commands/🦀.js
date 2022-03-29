const CigaretteReport = require("../models/CigaretteReport");
const {MessageMedia} = require("whatsapp-web.js");
const SeasonMember = require("../models/SeasonMember");
const SeasonManager = require("../utils/SeasonManager");

module.exports.run = async (client, message, args) => {
    try {
        const message = 'אותו תזכרו למה לכו תדעו מה יהיה איתו, ';
        const cancerIdAndAmount = await SeasonMember.find({season: SeasonManager.seasonNumber}).sort({amount: -1}).limit(1).exec();
        // const cancerIdAndAmount = await CigaretteReport.aggregate([
        //     { $group: { _id: '$userId', total: { $sum: 1 } } },
        //     { $sort: { total: -1 } },
        //     { $limit: 1}
        // ]).exec();
        const cancerImageUrl = await client.getProfilePicUrl(cancerIdAndAmount[0].userId);
        const cancerImage = await MessageMedia.fromUrl(cancerImageUrl);
        const cancerContact = await client.getContactById(cancerIdAndAmount[0].userId);

        client.sendBotMessage(
            client.chatId,
            `${message} @${cancerContact.id.user} , עישן בסיזן הזה ${cancerIdAndAmount[0].amount} סיגריות`,
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
