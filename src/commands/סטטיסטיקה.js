const CigaretteReport = require("../models/CigaretteReport");

const DAYS_IN_HEBREW = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const getLovedDayMessage = async (userId) => {
    const mostLovedDayAndAmount = await CigaretteReport.aggregate([
        { $match: { 'userId': userId}},
        { $group: { _id: '$day', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
        { $limit: 1 }
    ]).exec();
    return `היום האהוב עלייך לעישון הוא ${DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]} עם ${mostLovedDayAndAmount[0].total} סיגריות בכולל`;
}

const getLovedHourMessage = async (userId) => {
    const mostLovedHourAndAmount = await CigaretteReport.aggregate([
        { $match: { 'userId': userId}},
        { $group: { _id: '$hour', total: { $sum: 1 } } },
        { $sort: { total: -1 } },
        { $limit: 1 }
    ]).exec();
    return `השעה האהובה עלייך לעישון היא ${[mostLovedHourAndAmount[0]._id + ":00"]} עם ${mostLovedHourAndAmount[0].total} סיגריות בכולל`;
}

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error("meow");
        const mostLovedDayMessage = await getLovedDayMessage(author);
        const mostLovedHourMessage = await getLovedHourMessage(author);
        const amount = await CigaretteReport.count({ userId: author }).exec();
        client.sendBotMessage(
            client.chatId,
            `סטטיסטיקות ל@${authorPhone.id.user} \n\n ${mostLovedDayMessage} \n ${mostLovedHourMessage}`,
            { mentions: [authorPhone] }
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
        );
    }
};

module.exports.config = {
    name: "כמות",
    args: ["@מישהו"],
};
