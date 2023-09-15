import { MessageMedia } from 'whatsapp-web.js'
import { getCountPerSeasonOfUser } from '../utils/queries'
import { getTaggedPerson } from '../utils/functions'
import ChartJSImage from 'chart.js-image'

const createNewChartObject = (): any => {
    return {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'הגרף שלך יא דבע',
                    data: [],
                },
            ],
        },
        options: {
            title: {
                display: false,
            },
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'סיזן',
                        },
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'כמות',
                        },
                    },
                ],
            },
        },
    }
}

const getSeasonProgressChart = async (
    userId: string,
    name: string
): Promise<any> => {
    const chart = createNewChartObject()
    const amountPerSeason = await getCountPerSeasonOfUser(userId)

    amountPerSeason.forEach((season, index) => {
        chart.data.labels.push((index + 1).toString())
        chart.data.datasets[0].data.push(season.total.toString())
    })
    chart.data.datasets[0].label = name

    return chart
}

export const run = async (
    client: any,
    message: any,
    args: any[]
): Promise<void> => {
    const author = getTaggedPerson(message, args)
    const authorPhone: any = await client.getContactById(author)
    if (!authorPhone.pushname) throw new Error('meow')

    const chart = await getSeasonProgressChart(author, authorPhone.pushname)
    const imageUrl = new ChartJSImage()
        .chart(chart)
        .backgroundColor('white')
        .width('500')
        .height('300')
        .toURL()
    const image = await MessageMedia.fromUrl(imageUrl, { unsafeMime: true })
    client.sendBotMessage(
        client.chatId,
        `התפלגות סיזנים ל@${authorPhone.id.user}`,
        { mentions: [authorPhone], media: image }
    )
}

export const config = {
    name: 'התקדמות',
    args: ['@מישהו'],
}
