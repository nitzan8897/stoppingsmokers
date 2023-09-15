const magicShellAnswers = require('../../config/magicShell.json')
const OPEN_SENTENCE = '*קונכיית הקסם אומרת:*\n'

module.exports.run = async (client) => {
    const answer = await fetch(
        'https://www.eightballapi.com/api?question=should+I+smoke+this+cigarette?'
    )
        .then((response) => response.json())
        .then((answer) => {
            let fAnswer = answer.reading
            fAnswer = OPEN_SENTENCE + answersMap[fAnswer]

            const answer =
                magicShellAnswers.answers[
                    Math.floor(Math.random() * magicShellAnswers.answers.length)
                ]

            client.sendMessage(client.chatId, OPEN_SENTENCE + answer)
        })
}

module.exports.config = {
    name: '🐚',
}
