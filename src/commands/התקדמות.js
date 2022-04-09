const CigaretteReport = require("../models/CigaretteReport");
const {getTaggedPerson} = require("../utils/functions");
const ChartJSImage = require('chart.js-image');
const {MessageMedia} = require("whatsapp-web.js");
const {getCountPerSeasonOfUser} = require("../utils/queries");

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
    const amountPerSeason = await getCountPerSeasonOfUser(userId);

    amountPerSeason.forEach((season, index) => {
        chart.data.labels.push((index + 1).toString());
        chart.data.datasets[0].data.push((season.total).toString());
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
