const {MessageMedia} = require('whatsapp-web.js');
const {tryToRecoverReportsOfUser} = require("../utils/queries");

module.exports = async (client, notification) => {
    const chatId = await notification.getChat();
    if (client.chatId !== chatId.id._serialized) return;

    const contacts = await notification.getRecipients();
    for (const contact of contacts) {
        tryToRecoverReportsOfUser(contact.id.user);
        const contactPictureUrl = await contact.getProfilePicUrl();
        if (contactPictureUrl) {
            const contactPicture = await MessageMedia.fromUrl(contactPictureUrl);
            client.sendBotMessage(
                client.chatId,
                `תגידו שלום ל@${contact.id.user} שמעתי הוא רוצה להיות ילד טוב, עד עכשיו ספר שיניים \n תעשה !עזרה סמוך \n ואל תשכח לשלוח אמוגי 🚬 למה אני יודע מה עשית בקיץ האחרון🤬`,
                {media: contactPicture, mentions: [contact]}
            )
        }
    }
}
