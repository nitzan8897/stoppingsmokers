const stopMessage = require("../../smokers.json");
const CigaretteReport = require("../models/CigaretteReport");

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + '@c.us' : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error('meow');
        const amount = await CigaretteReport.count({ 'userId': author}).exec();
        client.sendBotMessage(client.chatId, `${authorPhone.pushname}, יש לך כבר: ${amount}`);
    } catch (e) {
        client.sendBotMessage(client.chatId, 'וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי');
    }
}

module.exports.config = {
    name: "כמות",
    args: ['@מישהו']
}