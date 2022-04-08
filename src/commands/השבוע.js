const CigaretteReport = require("../models/CigaretteReport");
const {DAYS_IN_HEBREW, getTaggedPerson} = require("../utils/functions");
const {getAmountInADayOfUser} = require("../utils/queries");

const getWeekMessage = async (userId, contact) => {
    let message = `בוא נראה אם היית ילד רע השבוע @${contact.id.user}\n\n`;
    const now = new Date();
    for (let day = 0; day < 7; day++) {
        const date = new Date(now - 24 * 60 * 60 * 1000 * day);
        const amount = getAmountInADayOfUser(userId, date);
        message += `יום ${DAYS_IN_HEBREW[date.getDay()]} , ה${date.getDate()}/${date.getMonth() + 1} עם ${amount} סיגריות\n`;
    }

    return message;
}

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw new Error("meow");

    const weekMessage = await getWeekMessage(author, authorContact);
    client.sendBotMessage(
        client.chatId,
        weekMessage,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "השבוע",
    args: ["@מישהו"],
};
