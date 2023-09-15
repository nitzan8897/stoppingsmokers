import { getTaggedPerson } from '../utils/functions'
import { getAmountInADayOfUser } from '../utils/queries'

const getExtraMessage = (amount: number): string => {
    if (amount === 0) {
        return 'פייי ילד טוב אתה אינעל העולם'
    } else if (amount <= 3) {
        return 'וואלה אתה בסדר אתה'
    } else if (amount <= 6) {
        return 'תרגיע עם הכמות כפרה'
    } else if (amount <= 9) {
        return 'מה יהיה איתך תגיד לי'
    } else if (amount <= 12) {
        return 'אני מבין אתה אובדני היום אה יזין'
    } else {
        return 'אברהמסון, כוכבית 9933'
    }
}

export const run = async (
    client: any,
    message: any,
    args: string[]
): Promise<void> => {
    const author = getTaggedPerson(message, args)
    const authorContact = await client.getContactById(author)
    if (!authorContact.pushname) throw new Error('meow')

    const amount = await getAmountInADayOfUser(author, new Date())
    const extraMessage = getExtraMessage(amount)
    client.sendBotMessage(
        client.chatId,
        `${extraMessage}, עישנת ${amount} סיגריות היום @${authorContact.id.user}`,
        { mentions: [authorContact] }
    )
}

export const config = {
    name: 'היום',
    args: ['@מישהו'],
}
