import { getAmountInADayOfUser } from '../utils/queries'
import { getTaggedPerson } from '../utils/functions'
import { DAYS_IN_HEBREW } from '../../config/consts'

const getWeekMessage = async (
    userId: string,
    contact: any
): Promise<string> => {
    let message = `בוא נראה אם היית ילד רע השבוע @${contact.id.user}\n\n`
    const now = new Date()
    for (let day = 0; day < 7; day++) {
        const date = new Date(now.getTime() - 24 * 60 * 60 * 1000 * day)
        const amount = await getAmountInADayOfUser(userId, date)
        message += `יום ${DAYS_IN_HEBREW[date.getDay()]}, ה${date.getDate()}/${
            date.getMonth() + 1
        } עם ${amount} סיגריות\n`
    }

    return message
}

export const run = async (
    client: any,
    message: any,
    args: any[]
): Promise<void> => {
    const author = getTaggedPerson(message, args)
    const authorContact: any = await client.getContactById(author)
    if (!authorContact.pushname) throw new Error('meow')

    const weekMessage = await getWeekMessage(author, authorContact)
    client.sendBotMessage(client.chatId, weekMessage, {
        mentions: [authorContact],
    })
}

export const config = {
    name: 'השבוע',
    args: ['@מישהו'],
}
