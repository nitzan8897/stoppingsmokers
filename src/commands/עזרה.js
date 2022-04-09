module.exports.run = async (client) => {
    let helpCommands = "הבנתי אתה מתקשה קח עזרה\n\n";
    const commands = [...client.commands.values()];
    commands
        .filter((command) => command?.config?.name && command.config.name !== "עזרה")
        .forEach((command) => {
            helpCommands += "!" + command.config.name + (command.config?.args ? " " + command.config?.args : "") + "\n";
        });
    client.sendBotMessage(client.chatId, helpCommands);
};

module.exports.config = {
    name: "עזרה",
};
