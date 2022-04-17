class ConfigHandler {
    constructor(client) {
        this.client = client
    }

    init() {
        this.client.chatId = process.env.SMOKING_GROUP
        console.log("Initialized config handler with chatId: " + this.client.chatId);
        this.client.sendBotMessage = (chatId, message, options) => {
            const newMessage =
                '----------------------------------------\n' +
                message +
                '\n----------------------------------------'
            this.client.sendMessage(chatId, newMessage, options)
        }
    }
}

module.exports = ConfigHandler
