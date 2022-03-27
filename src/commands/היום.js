const stopMessage = require("../../smokers.json");
const CigaretteReport = require("../models/CigaretteReport");

const getExtraMessage = (amount) => {
    if (amount === 0) {
        return 'פייי ילד טוב אתה אינעל העולם';
    } else if (amount <= 3) {
        return 'וואלה אתה בסדר אתה'
    } else if (amount <= 10) {
        return 'אני מבין אתה אובדני היום אה יזין'
    } else {
        return 'אברהמסון, כוכבית 9933';
    }
} 

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + '@c.us' : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error('meow');
        const amount = await CigaretteReport.count({ 'userId': author, 'day': new Date().getDay(), 'month': new Date().getMonth(), 'year': new Date().getFullYear()}).exec();
        const extraMessage = getExtraMessage(amount);
        client.sendBotMessage(client.chatId, `${extraMessage}, עישנת ${amount} סיגריות היום @${authorPhone.id.user}`, { mentions: [authorPhone]});
    } catch (e) {
        client.sendBotMessage(client.chatId, 'וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי');
    }
}

module.exports.config = {
    name: "היום",
    args: ['@מישהו']
}