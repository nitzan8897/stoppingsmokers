const CigaretteReport = require("../models/CigaretteReport");
const {getTaggedPerson} = require("../utils/functions");
const {getAmountInADayOfUser} = require("../utils/queries");

const getExtraMessage = (amount) => {
    if (amount === 0) {
        return "פייי ילד טוב אתה אינעל העולם";
    } else if (amount <= 3) {
        return "וואלה אתה בסדר אתה";
    } else if (amount <= 6) {
        return "תרגיע עם הכמות כפרה";
    } else if (amount <= 9) {
        return "מה יהיה איתך תגיד לי";
    } else if (amount <= 12) {
        return "אני מבין אתה אובדני היום אה יזין";
    } else {
        return "אברהמסון, כוכבית 9933";
    }
};

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw new Error("meow");

    const amount = getAmountInADayOfUser(author, new Date());
    const extraMessage = getExtraMessage(amount);
    client.sendBotMessage(
        client.chatId,
        `${extraMessage}, עישנת ${amount} סיגריות היום @${authorContact.id.user}`,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "היום",
    args: ["@מישהו"],
};
