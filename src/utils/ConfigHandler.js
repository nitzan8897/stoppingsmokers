class ConfigHandler {
    constructor(client) {
        this.client = client
    }

    init() {
        this.client.chatId = process.env.SMOKING_GROUP
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
