const CigaretteReport = require("../models/CigaretteReport");

async function getSeasonAmountMessage(userId) {
    const amountPerSeason = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {$group: {_id: '$season', total: {$sum: 1}}}
    ]).exec();
    let message = ``;
    amountPerSeason.forEach((season, index) => {
        message += `סיזן ${index + 1} עישנת ${season.total} סיגריות\n`;
    });

    return message;
}

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error("meow");
        const message = await getSeasonAmountMessage(author);
        client.sendBotMessage(
            client.chatId,
            `התפלגות סיזנים ל@${authorPhone.id.user}\n\n${message}`,
            {mentions: [authorPhone]}
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
        );
    }
};

module.exports.config = {
    name: "התקדמות",
    args: ["@מישהו"],
};
