const Discord = require("discord.js")
const fs = require("fs")
const token = "Token"
const mongo = require("mongoose")

mongo.connect('uri')

const db = mongo.connection

db.on('error', function() {
    console.log("error")
})

db.once('open', function () {
    console.log("connected.")
})

const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'))

for (const files of commandFiles) {
    const command = require(`./commands/${files}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'ping',
            description: 'pong'
        }
    })
    console.log(`logged in as ${token}`)
})

client.ws.on("INTERACTION_CREATE", async interaction => {
    client.api.interactions(interaction.id, interaction.token).callback.post(
        {
            data: {
                type: 4,
                data: {
                    content: 'Pong!'
                }
            }
        }
    )
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const commandname = client.commands.get(command)
        || client.commands.find(cmd => cmd.aliases && cms.aliases.includes(command))

    if(!commandname) return

    if (!client.commands.has(command)) return

    try {
        client.commands.get(command).execute(client, message, args, db)
    } catch(error) {
        console.error(error)
        message.reply(`error. ${error}`)
    }
})

const user = mongo.Schema({
    id: 'number',
    score: 'number'
})
const user1 = mongo.model('Schema', user)

client.on('clickButton', async (button) => {
    user1.findById({_id: button.author.id}, function(error, user){
        if(error){
            button.reply.send("실패", false)
        }
        else{
            user.score++

            user.save(function (error){
                if(error){
                    button.reply.send('실패', false)
                }
                else{
                    button.reply.send('완료', true)
                }})

        }
    })

})

client.login(token)