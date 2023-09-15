import fs from 'fs'

class Session {
    private static instance: Session | undefined
    sessionData: any | undefined

    private constructor() {
        const SESSION_FILE_PATH = './session.json'
        this.sessionData = undefined
        if (fs.existsSync(SESSION_FILE_PATH)) {
            this.sessionData = JSON.parse(
                fs.readFileSync(SESSION_FILE_PATH, 'utf-8')
            )
        }
    }

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session()
        }
        return Session.instance
    }

    public setSessionData(sessionData: any): void {
        if (this.sessionData) return
        this.sessionData = sessionData
        fs.writeFile('./session.json', JSON.stringify(sessionData), (err) => {
            if (err) {
                console.error(err)
            }
        })
    }
}

export default Session
