const but = require("discord-buttons")
const discord = require("discord.js")
module.exports = {
    name: 'score',
    aliases: ['점수'],
    run: async (client, message, args, db) => {
        const embed = new discord.MessageEmbed()
            .setTitle('점수')
            .setDescription(`내 점수는 ${score}, 버튼을 눌러 점수를 얻자.`)
        const button = new but.MessageButton().setLabel('눌러서 점수 얻기')
        await message.channel.send(embed, button)
    }
}