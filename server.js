// Initialize Express
const express = require('express');
const app = express();

// NPM packages
const expHandleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');

// Establish connection to mongo DB
const mongoose = require('mongoose');
mongoose.connect('mongodb:') //create mongodb on mlab

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Handlebars
app.engine("handlebars", expHandleBars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);

request('https://www.wsj.com/news/technology', (error, response, body) => {
    // console.log('error: ', error);
    // console.log('statusCode: ', response);
    const $ = cheerio.load(body);

    const result = {
        headline:[],
        summary:[],
    }
    
    // Scrap WSJ headlines
    $('.wsj-headline').each((i, element) => {
        const headline = $(element).text();
        result.headline.push(headline[0]);
    });
    //Scrap WSJ Summaries
    $('.wsj-summary').each((i, element) => {
        const summary = $(element).text();
        result.summary.push(summary[0]);
    })

    console.log(result.headline + '\n' + result.summary);
});

const port = process.env.PORT || 3000;
//listening app.js on port 3000
const server = app.listen(port, ()=> {
    console.log('Initializing server listening on port ' + port);
});

module.exports = app;