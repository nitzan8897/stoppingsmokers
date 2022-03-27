const fs = require('fs');

class CommandHandler {
    constructor(client) {
        this.client = client;
    }

    init() {
        fs.readdir('./src/commands/', (err, commandFolders) => {
            if (err) console.log(err);
            if(!commandFolders[0]) return;
    
            commandFolders.forEach((commandFolder) => {
                fs.readdir(`./src/commands/${commandFolder}`, (err, commands) => {
                    if (!commands) return;
            
                    commands = commands.filter(command => command.split('.')[1] === 'js');
                    commands.forEach((command) => {
                        const pull = require(`../commands/${commandFolder}/${command}`);
                        this.client.commands.set(pull.config.name, pull);
                    });
                    this.client.commands.set('🚬', require('../commands/🚬.js'));
                });
            });
        });
    }
}

module.exports = CommandHandler;