const fs = require('fs')
const consoleColorCodes = require('../../config/consts')

class EventHandler {
    constructor(client) {
        this.client = client
    }

    init() {
        const files = fs
            .readdirSync('./src/events')
            .filter((x) => x.endsWith('.js'))
        for (const file of files) {
            const event = require(`../events/${file}`)
            const name = file.split('.')[0]
            this.client.on(name, event.bind(null, this.client))
        }
        console.info(
            consoleColorCodes.boldGreen,
            '{ EventHandler: Initialized Event Handler }'
        )
    }
}

module.exports = EventHandler
