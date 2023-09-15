import fs from 'fs'
import { consoleColorCodes } from '../../config/consts'

export default class CommandHandler {
    client: any = {}
    constructor(client: any) {
        this.client = client
    }

    init() {
        this.client.commands = new Map()
        fs.readdir(
            './dist/commands',
            (err: NodeJS.ErrnoException | null, commands: string[]) => {
                if (err) console.log(err)
                if (!commands[0]) return

                commands = commands
                    .filter((command) => command.split('.')[1] === 'js')
                    .forEach((command) => {
                        const pull = require(`../commands/${command}`)
                        if (!pull?.config?.name) return
                        this.client.commands.set(pull.config.name, pull)
                    })
                this.client.commands.set('🚬', require('../commands/🚬.js'))
            }
        )
        console.info(
            consoleColorCodes.boldGreen,
            '{ Command Handler: Initialized Command Handler }'
        )
    }
}
