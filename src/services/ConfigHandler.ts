import { consoleColorCodes } from '../../config/consts'

class ConfigHandler {
    private client: any

    constructor(client: any) {
        this.client = client
    }

    init(): void {
        this.client.chatId = process.env.SMOKING_GROUP
        console.info(
            consoleColorCodes.boldGreen,
            `{ ConfigHandler: Initialized Config Handler with chatId: ${this.client.chatId} }`
        )
        this.client.sendBotMessage = (
            chatId: string,
            message: string,
            options: any
        ) => {
            const newMessage =
                '-----------------------------------\n' +
                message +
                '\n-----------------------------------'
            this.client.sendMessage(chatId, newMessage, options)
        }
    }
}

export default ConfigHandler
