const mongo = require("mongoose")
module.exports = {
    name: 'register',
    aliases: ['가입'],
    run: async (client, message, args, db) => {
        const user = mongo.Schema({
            id: 'number',
            score: 'number'
        })
        const user1 = mongo.model('Schema', user)
        user1.findOne({_id: message.author.id}, function(error, user){
            if(error){
                const newUser = new user1({name: message.author.id, score: '0'})
                newUser.save(function(error, data){
                    if(error){
                        message.reply(`오류가 발생했어요. ${error}`)
                    }
                    else {
                        message.reply(`가입이 완료되었습니다. ${message.author.name}`)
                    }
                })
            }
            else{
                message.reply("이미 가입되어있습니다.")
            }
        })
    }
}