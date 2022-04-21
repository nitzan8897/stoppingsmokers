const CigaretteReport = require("../models/CigaretteReport");
const {getTaggedPerson} = require("../utils/functions");
const ChartJSImage = require('chart.js-image');
const {MessageMedia} = require("whatsapp-web.js");
const {getCountPerSeasonOfUser} = require("../utils/queries");
const SeasonManager = require("../services/SeasonManager");

const createNewChartObject = () => {
    return {
        type: 'bar',
        data: {
            labels: [

            ],
            datasets: [
                {
                    label: 'הגרף שלך יא דבע',
                    data: [

                    ]
                }
            ]
        },
        options: {
            title: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'סיזן'
                        }
                    }
                ],
                yAxes: [
                    {
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'כמות'
                        }
                    }
                ]
            }
        }
    }
}

const getSeasonProgressChart = async (userId, name) => {
    const chart = createNewChartObject();
    let amountPerSeason = await getCountPerSeasonOfUser('972548023436@c.us');
    const participatedSeasons = new Map();
    amountPerSeason.forEach((season, index) => participatedSeasons.set(index + 1, season.total));
    amountPerSeason = [];
    for (let season = 1; season <= SeasonManager.seasonNumber; season++) {
        amountPerSeason.push({number: season, total: participatedSeasons.get(season) ?? 0});
    }
    amountPerSeason.forEach((season) => {
        chart.data.labels.push(season.number.toString());
        chart.data.datasets[0].data.push(season.total.toString());
    });
    chart.data.datasets[0].label = name;

    return chart;
};

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorPhone = await client.getContactById(author);
    if (!authorPhone.pushname) throw new Error("meow");

    const chart = await getSeasonProgressChart(author, authorPhone.pushname);
    const imageUrl = ChartJSImage().chart(chart).backgroundColor('white').width(500).height(300).toURL();
    const image = await MessageMedia.fromUrl(imageUrl, {unsafeMime: true});
    client.sendBotMessage(
        client.chatId,
        `התפלגות סיזנים ל@${authorPhone.id.user}`,
        {mentions: [authorPhone], media: image}
    );
};

module.exports.config = {
    name: "התקדמות",
    args: ["@מישהו"],
};
