interface Command {
    config: {
        name: string
        args?: string
    }
    run: (client: any) => Promise<void>
}

export const helpCommand: Command = {
    async run(client: any): Promise<void> {
        let helpCommands = 'הבנתי אתה מתקשה קח עזרה\n\n'
        const commands = [...client.commands.values()]
        commands
            .filter(
                (command) =>
                    command?.config?.name && command.config.name !== 'עזרה'
            )
            .forEach((command) => {
                helpCommands +=
                    '!' +
                    command.config.name +
                    (command.config?.args ? ' ' + command.config?.args : '') +
                    '\n'
            })
        client.sendBotMessage(client.chatId, helpCommands)
    },
    config: {
        name: 'עזרה',
    },
}
