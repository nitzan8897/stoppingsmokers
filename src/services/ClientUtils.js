const onMessage = require('../events/message');
const CigaretteReport = require('../models/CigaretteReport');

class ClientUtils {
    static async catchUpOnMessages(client) {
        try {
            const chat = await client.getChatById(client.chatId);
            console.log(chat);
            const messages = await chat.fetchMessages();
            const lastCigaretteReport = await CigaretteReport.find().sort({date: -1}).limit(1).exec();
            messages.filter((message) => new Date(message.timestamp) > lastCigaretteReport[0].date).forEach((message) => {
                onMessage(client, message);
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = ClientUtils;