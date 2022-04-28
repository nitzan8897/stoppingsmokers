const onMessage = require('../events/message');
const CigaretteReport = require('../models/CigaretteReport');

class ClientUtils {
    static async catchUpOnMessages(client) {
        try {
            const chat = await client.getChatById(client.chatId);
            console.log(chat);
            const messages = await chat.fetchMessages({limit: 300});
            const lastCigaretteReport = await CigaretteReport.find().sort({date: -1}).limit(1).exec();
            const relevantMessages = messages.filter((message) => new Date(message.timestamp * 1000) > lastCigaretteReport[0].date && message.body === '🚬');
            for (const message of relevantMessages) {
                onMessage(client, message, {date: new Date(message.timestamp * 1000)});
                await new Promise((resolve) => setTimeout(() => resolve(), 1000));
            }
        } catch (e) {
            console.error(e);
        }
    }

    static async getAllUsersInChat(client) {
        try {
            const chat = await client.getChatById(client.chatId);
            const participants = chat.participants.map((participant) => participant.id);

            return participants;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = ClientUtils;