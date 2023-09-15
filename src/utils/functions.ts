export const getTaggedPerson = (message: any, args: string[]) => {
    return args && args[0] ? args[0].slice(1) + '@c.us' : message.author
}

export const getTopSmokersMessage = (topSmokers: any[], mentions: any[]) => {
    let message = ``
    topSmokers.forEach((smoker, index) => {
        mentions.push(smoker._id)
        const user = `@${smoker._id.id.user}`
        const amount = smoker.total
        const place = index + 1
        message += `במקום ה${place} עם ${amount}, ${user} \n`
    })

    return message
}
