const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "edf9c84bae89bee589fc1fc4a3477560";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const WeatherData = JSON.parse(data)
            const Data = WeatherData.main.temp
            const Data2 = WeatherData.weather[0].description
            const Data3 = WeatherData.name
            const icon = WeatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The Temprature in " + query + " is "+ Data + " degree Celcius.</h1>")
            res.write("<p>The Weather is currently " + Data2 + "</p>")
            res.write("<img src=" + imageUrl +">")
            res.send()
        })
    })

});
 





app.listen(3000, function(){
    console.log("Server is Running on port 3000.");
})