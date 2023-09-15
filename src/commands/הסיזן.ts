import { getTaggedPerson } from '../utils/functions'
import { getCountOfUserThisSeason } from '../utils/queries'

export const run = async (
    client: any,
    message: any,
    args: any
): Promise<void> => {
    const author = getTaggedPerson(message, args)
    const authorPhone = await client.getContactById(author)
    if (!authorPhone.pushname) throw new Error('meow')

    const amount = await getCountOfUserThisSeason(author)
    client.sendBotMessage(
        client.chatId,
        `אחשלנו היקר, עישנת הסיזן הזה ${amount} סיגריות, @${authorPhone.id.user}`,
        { mentions: [authorPhone] }
    )
}

export const config = {
    name: 'הסיזן',
    args: ['@מישהו'],
}
