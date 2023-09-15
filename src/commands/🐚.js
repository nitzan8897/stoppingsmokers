const answersMap = require('../../config/magicBall.json')
const OPEN_SENTENCE = '*קונכיית הקסם אומרת:*\n'

module.exports.run = async (client) => {
    const answer = await fetch(
        'https://www.eightballapi.com/api?question=should+I+smoke+this+cigarette?'
    )
        .then((response) => response.json())
        .then((answer) => {
            let fAnswer = answer.reading
            fAnswer = OPEN_SENTENCE + answersMap[fAnswer]

            client.sendMessage(client.chatId, fAnswer)
            console.log(fAnswer, { answer })
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports.config = {
    name: '🐚',
}
