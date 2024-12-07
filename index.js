const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const UserModel = require('./md');

const token = "7830284877:AAFjn9xr6FKGi1AROXwFJp73vkvEN3CJgqM"

const bot =  new TelegramApi(token, {polling    : true})




const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение лопнуло')
    }

    bot.setMyCommands([
        {command: '/start', description: "Проверить"},
        {command: '/how', description: "Гайд"},
        {command: '/balance', description: "Текущий прогресс"},
        {command: '/snow', description: "Слепить снеговика"},
        {command: '/fire', description: "Взорвать хлопушку"},
        {command: '/tree', description: "Полить ёлочку"},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const username = msg.chat.username;
        const firstname = msg.chat.first_name;
        try {
            if (text === '/start'){
                await UserModel.create({chatId})
            }
            if (text === '/how'){
                return bot.sendMessage(chatId, `/snow - Слепить снеговика \n /fire - Взорвать хлопушку \n /tree - Полить ёлочку`)
            }
            const user = await UserModel.findOne({chatId});
            if (text === '/balance'){   
                
                await bot.sendMessage(chatId, ` Твой баланс - ${user.scores} баллов \n Ёлка - ${user.tree} \n Армия снеговиков - ${user.snow} \n Взорвано хлопушек - ${user.fire}`)
            }
            if (text === '/snow'){  
                const randomNumber = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                await bot.sendMessage(chatId, `❄️${firstname} cлепил(а) снеговика высотой ${randomNumber} метра⛄️ +${randomNumber}балла`)
                user.snow += 1;
                user.scores += randomNumber;
            }
            if (text === '/fire'){
                const randomNumber = Math.floor(Math.random() * (4 - 2 + 1)) + 1;
                await bot.sendMessage(chatId, `БУМ!🎉 ${firstname} взорвал(а) хлопушку!🎉 Конфетти разлетелись на ${randomNumber} метра. +${randomNumber} балла`)
                user.fire += 1;
                user.scores += randomNumber;
            }
            if (text === '/tree'){
                const randomNumber = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
                await bot.sendMessage(chatId, `💦🌲 Ёлка @${username} выросла на ${randomNumber}см`)
                user.tree += randomNumber;
                user.scores += randomNumber;
            }
            await user.save();
        } catch (e) {
            bot.sendMessage(chatId, 'Произошла ошибка')
        }
    })  
}
start()