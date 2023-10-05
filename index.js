const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express= require('express');
const app = express();
app.get('/', (req,res)=>{
  res.send("Hello");
});
const port = 3000;
app.listen(port,()=>{
  console.log(`Server running at http://localhost:${port}`);
});

const token ="6376754050:AAE7HxG1ELUOvbHW7POZndhs42mxcVRYsGA"; 
const bot = new TelegramBot(token, {polling:true});
bot.on("message", async (msg)=>{
   const chatId = msg.chat.id;
   const userInput= msg.text;
//     const message= "hello"
//    bot.sendMessage(chatId,message);  
  try{
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=403a97a2a164654e0ac005792b42547c `
    );
    const data= response.data;
    const weather= data.weather[0].description;
    const temperature= data.main.temp - 273.15;
    const city = data.name;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const message= `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C.The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s `;

    bot.sendMessage(chatId,message);  
  }
  catch(error){
    bot.sendMessage(chatId,"City doesn't exist.");  
  }
});