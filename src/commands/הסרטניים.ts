import { getTopNSmokersInSeason } from '../utils/queries'
import { getTopSmokersMessage } from '../utils/functions'

export const run = async (client: any): Promise<void> => {
    const mentions: any[] = []
    const topSmokers = await getTopNSmokersInSeason(5, -1)
    for (const smoker of topSmokers) {
        smoker._id = await client.getContactById(smoker._id)
        mentions.push(smoker._id)
    }
    const message = getTopSmokersMessage(topSmokers, mentions)
    client.sendBotMessage(client.chatId, message, { mentions })
}

export const config = {
    name: 'הסרטניים',
}
