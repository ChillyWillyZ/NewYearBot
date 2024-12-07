const TelegramApi = require('node-telegram-bot-api')

const token = "7830284877:AAFjn9xr6FKGi1AROXwFJp73vkvEN3CJgqM"

const bot =  new TelegramApi(token, {polling    : true})

bot.setMyCommands([
    {command: '/start', description: "Проверить"},
    {command: '/how', description: "Гайд"},
    {command: '/snow', description: "Слепить снеговика"},
    {command: '/fire', description: "Взорвать хлопушку"},
    {command: '/tree', description: "Полить ёлочку"},
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const firstname = msg.chat.first_name;
    if (text === '/how'){
        await bot.sendMessage(chatId, `/snow - Слепить снеговика \n /fire - Взорвать хлопушку \n /tree - Полить ёлочку`)
    }
    if (text === '/snow'){
        const randomNumber = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        await bot.sendMessage(chatId, `❄️${firstname} cлепил(а) снеговика высотой ${randomNumber} метра⛄️ +${randomNumber}балла`)
    }
    if (text === '/fire'){
        const randomNumber = Math.floor(Math.random() * (4 - 2 + 1)) + 1;
        await bot.sendMessage(chatId, `БУМ!🎉 ${firstname} взорвал(а) хлопушку!🎉 Конфетти разлетелись на ${randomNumber} метра. +${randomNumber} балла`)
    }
    if (text === '/tree'){
        const randomNumber = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        await bot.sendMessage(chatId, `💦🌲 Ёлка @${username} выросла на ${randomNumber}см`)
    }
    
})