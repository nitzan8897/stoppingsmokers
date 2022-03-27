const CigaretteReport = require('../models/CigaretteReport')

module.exports.run = async (client, message, args) => {
    try {
        let message = ''
        const mentions = []
        const topSmokers = await CigaretteReport.aggregate([
            { $group: { _id: '$userId', total: { $sum: 1 } } },
            { $sort: { total: 1 } },
        ]).exec()
        for (const smoker of topSmokers) {
            smoker._id = await client.getContactById(smoker._id)
        }
        topSmokers.slice(0, 5).forEach((smoker, index) => {
            mentions.push(smoker._id)
            const user = `@${smoker._id.id.user}`
            const amount = smoker.total
            const place = index + 1
            message += `במקום ה${place} עם ${amount}, ${user} \n`
        })
        client.sendBotMessage(client.chatId, message, { mentions })
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            'וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי'
        )
    }
}

module.exports.config = {
    name: 'הנגמלים',
}
