const SeasonMember = require('../models/SeasonMember')
const SeasonManager = require('../services/SeasonManager')

// const addUserToSeason = async (author) => {
//   const user = await SeasonMember.findOne({ season: SeasonManager.seasonNumber, 'userId': author}).exec();
//   if (user) return;

//   const newMemberInSeason = new SeasonMember({ season: SeasonManager.seasonNumber, userId: author, amount: 0});
//   await newMemberInSeason.save();
// }

module.exports = async (client, message, extraOptions) => {
    if (message.from !== client.chatId) return

    if (message.body === '🚬') {
        client.commands.get('🚬').run(client, message, extraOptions?.date)
        return
    }

    const prefix = '!'
    if (!message.body.startsWith(prefix)) return

    const messageArray = message.body.split(' ')
    const command = messageArray[0]
    const args = messageArray.slice(1)

    const commandfile = client.commands.get(
        command.slice(prefix.length).toString().toLowerCase()
    )
    try {
        if (commandfile) {
            await commandfile.run(client, message, args)
        } else {
            await client.commands.get('עזרה').run(client)
        }
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            'וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי'
        )
    }
}
