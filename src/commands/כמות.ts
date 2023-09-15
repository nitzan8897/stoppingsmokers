import { getTaggedPerson } from '../utils/functions'
import { getCountOfUser } from '../utils/queries'

export const run = async (
    client: any,
    message: any,
    args: any[]
): Promise<void> => {
    const author: string = getTaggedPerson(message, args)
    const authorContact: any = await client.getContactById(author)
    if (!authorContact.pushname) throw new Error('meow')

    const amount: number = await getCountOfUser(author)
    client.sendBotMessage(
        client.chatId,
        `@${authorContact.id.user}, יש לך כבר: ${amount}\nשזה שווה ערך ל${(
            amount * 1.5
        ).toFixed(1)} שקלים יא פראייר חחחחחחחחחחח`,
        { mentions: [authorContact] }
    )
}

export const config = {
    name: 'כמות',
    args: ['@מישהו'],
}
