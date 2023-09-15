export async function handleIncomingMessage(
    client: any,
    message: any,
    extraOptions?: any
): Promise<void> {
    if (message.from !== client.chatId) return

    if (message.body === '🚬') {
        const command = client.commands.get('🚬')
        if (command) {
            command.run(client, message, extraOptions?.date)
        }
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
