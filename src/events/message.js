module.exports = async (client, message) => {
	if (message.from !== client.chatId) return;
    if (message.body === '🚬') {
        client.commands.get('🚬').run(client, message);
		return;
    }

    const prefix = "!";
    if (!message.body.startsWith(prefix) ) return;

	const messageArray = message.body.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase());
	if (commandfile) {
		commandfile.run(client, message, args);
	} else {
		client.commands.get('עזרה').run(client, message);
	}
}