const express = require("express");
const { get } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {


    const query = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=915add54089bec715ba5878efa742074&units=metric ";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            var weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const discription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1 align='center'>Todays temprature in " + query + " is " + temp + " degree celcius</h1>");
            res.write("<br><hr>");
            res.write("<em align='center'>The weather in " + query + " today is " + discription + "</em>");

            res.write("<img src=" + imageUrl + " align='center'>");

            res.send();
        })
    });

})




app.listen(3000, function () {
    console.log("server started");
});