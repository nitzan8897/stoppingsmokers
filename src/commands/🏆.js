const CigaretteReport = require("../models/CigaretteReport");
const {MessageMedia} = require("whatsapp-web.js");
const SeasonMember = require("../models/SeasonMember");
const SeasonManager = require("../utils/SeasonManager");

module.exports.run = async (client, message, args) => {
    try {
        const message = 'זה הילד הטוב שלנו, ';
        const winnerIdAndAmount = await SeasonMember.find({season: SeasonManager.seasonNumber}).sort({amount: 1}).limit(1).exec();
        // const winnerIdAndAmount = await CigaretteReport.aggregate([
        //     { $group: { _id: '$userId', total: { $sum: 1 } } },
        //     { $sort: { total: 1 } },
        //     { $limit: 1}
        // ]).exec();
        const winnerImageUrl = await client.getProfilePicUrl(winnerIdAndAmount[0].userId);
        const winnerImage = await MessageMedia.fromUrl(winnerImageUrl);
        const winnerContact = await client.getContactById(winnerIdAndAmount[0].userId);

        client.sendBotMessage(
            client.chatId,
            `${message} @${winnerContact.id.user} תמשיך ככה, אולי יצא ממך משהו, עישנת בסיזן הזה רק ${winnerIdAndAmount[0].amount}`,
            { media: winnerImage, mentions: [winnerContact] }
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
        );
    }
};

module.exports.config = {
    name: "🏆"
};
