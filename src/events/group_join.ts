import { MessageMedia } from 'whatsapp-web.js'

export async function handleNotification(
    client: any,
    notification: any
): Promise<void> {
    const chatId = await notification.getChat()
    if (client.chatId !== chatId) return

    const contacts = await notification.getRecipients()
    for (const contact of contacts) {
        const contactPictureUrl = await contact.getProfilePicUrl()
        if (contactPictureUrl) {
            const contactPicture = await MessageMedia.fromUrl(contactPictureUrl)
            client.sendBotMessage(
                client.chatId,
                `תגידו שלום ל@${contact.id.user} שמעתי הוא רוצה להיות ילד טוב, עד עכשיו ספר שיניים \n תעשה !עזרה סמוך \n ואל תשכח לשלוח אמוגי 🚬 למה אני יודע מה עשית בקיץ האחרון🤬`,
                { media: contactPicture, mentions: [contact] }
            )
        }
    }
}
