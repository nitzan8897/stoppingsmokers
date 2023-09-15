import { getTaggedPerson } from '../utils/functions'
import { getLastCigaretteTimeOfUser } from '../utils/queries'

export const run = async (
    client: any,
    message: any,
    args: string[]
): Promise<void> => {
    const author = getTaggedPerson(message, args)
    const authorContact = await client.getContactById(author)

    let lastCigaretteTime = await getLastCigaretteTimeOfUser(author)
    if (!lastCigaretteTime) {
        client.sendBotMessage(
            client.chatId,
            `@${authorContact.id.user} אתה סאחי אחי.`,
            { mentions: [authorContact] }
        )
        return
    }

    const lastCigaretteDate = new Date(lastCigaretteTime)
    const now = new Date()

    let differenceInSeconds = (now - lastCigaretteDate) / 1000
    const days = Math.floor(differenceInSeconds / 86400).toFixed(0)
    differenceInSeconds -= days * 86400
    const hours = (Math.floor(differenceInSeconds / 3600) % 24).toFixed(0)
    differenceInSeconds -= hours * 3600
    const minutes = (Math.floor(differenceInSeconds / 60) % 60).toFixed(0)
    differenceInSeconds -= minutes * 60
    const seconds = (differenceInSeconds % 60).toFixed(0)

    const introMessage = `@${authorContact.id.user} אתה בלי הסיגי כבר`
    const dayMessage = days > 0 ? ` ${days} ימים,` : ``
    const hourMessage = hours > 0 || days > 0 ? ` ${hours} שעות,` : ``
    const minuteMessage =
        minutes > 0 || hours > 0 || days > 0 ? ` ${minutes} דקות,` : ``
    const secondMessage = ` ו${seconds} שניות`
    const lastCigaretteMessage = `${introMessage}${dayMessage}${hourMessage}${minuteMessage}${secondMessage}`
    client.sendBotMessage(client.chatId, lastCigaretteMessage, {
        mentions: [authorContact],
    })
}

export const config = {
    name: 'האחרונה',
    args: ['@מישהו'],
}
