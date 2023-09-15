import CigaretteReport from '../models/CigaretteReport'

export default class ClientUtils {
    static async catchUpOnMessages(client: any): Promise<void> {
        try {
            const chat = await client.getChatById(client.chatId)
            console.log(chat)
            const messages = await chat.fetchMessages({ limit: 300 })
            const lastCigaretteReport = await CigaretteReport.find()
                .sort({ date: -1 })
                .limit(1)
                .exec()
            const relevantMessages = messages.filter(
                (message: any) =>
                    new Date(message.timestamp * 1000) >
                        lastCigaretteReport[0].date && message.body === '🚬'
            )
            for (const message of relevantMessages) {
                message(client, message, {
                    date: new Date(message.timestamp * 1000),
                })
                await new Promise<void>((resolve) =>
                    setTimeout(() => resolve(), 1000)
                )
            }
        } catch (e) {
            console.error(e)
        }
    }
}
