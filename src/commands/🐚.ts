import magicShellAnswers from '../../config/magicShell.json'

const OPEN_SENTENCE = '*קונכיית הקסם אומרת:*\n'

export const run = async (client: any): Promise<void> => {
    const answerIndex = Math.floor(
        Math.random() * magicShellAnswers.answers.length
    )
    const answer = magicShellAnswers.answers[answerIndex]

    client.sendMessage(client.chatId, OPEN_SENTENCE + answer)
}

export const config = {
    name: '🐚',
}
