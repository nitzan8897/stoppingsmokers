const {MessageMedia} = require("whatsapp-web.js");

module.exports = async (client, notification) => {
    const contacts = await notification.getRecipients();
    for (const contact of contacts) {
       const contactPictureUrl = await contact.getProfilePicUrl();
       const contactPicture = await MessageMedia.fromUrl(contactPictureUrl);
       client.sendBotMessage(client.chatId,
           `תגידו שלום `,
           {media: contactPicture, mentions: [contact]})
    }
}