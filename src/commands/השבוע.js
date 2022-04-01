const CigaretteReport = require("../models/CigaretteReport");

const DAYS_IN_HEBREW = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error("meow");
        let message = `בוא נראה אם היית ילד רע השבוע @${authorPhone.id.user}\n\n`;
        const now = new Date();
        for (let day = 0; day < 7; day++) {
            const date = new Date(now.getTime() - 24 * 60 * 60 * 1000 * day);
            const amount = await CigaretteReport.count({
                userId: author,
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear(),
            }).exec();
            message += `יום ${DAYS_IN_HEBREW[date.getDay()]} , ה${date.getDate()}/${date.getMonth() + 1} עם ${amount} סיגריות\n`;
        }

        client.sendBotMessage(
            client.chatId,
            message,
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
    name: "השבוע",
    args: ["@מישהו"],
};
