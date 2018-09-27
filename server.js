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
//connects to mlab 15193
mongoose.connect('mongodb://news-scraper-hw:NewsYouCantMiss2@ds15193.mlab.com:15193/news-scraper');
const db = require('./models');

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
//GET Route for scraping WSJ Technology Site
app.get("/scrape", (req, res) => {
    const results = [];
    
    request('https://www.wsj.com/news/technology', (error, response, body) => {
    // console.log('error: ', error);
    // console.log('statusCode: ', response);
        const $ = cheerio.load(body);
        const headlines = [];
        const summaries = [];
        // Scrap WSJ headlines
        $('.wsj-headline').each((i, element) => {
            const headline = $(element).text();
            // console.log(headline);
            headlines.push(headline);
        });
        
        //Scrap WSJ Summaries
        $('.wsj-summary').each((i, element) => {
            const summary = $(element).text();
            // console.log(summary);
            summaries.push(summary);
        })

        // db.article.create(result)
        //     .then((dbArticle) => {
        //         console.log(dbArticle);
        //     })
        //     .catch((err) => {
        //         return res.json(err);
        //     })

    });
    console.log(results);
    res.send("Article successfully scraped. Here's are the headline found: \n");
})

const port = process.env.PORT || 3000;
//listening app.js on port 3000
const server = app.listen(port, ()=> {
    console.log('Initializing server listening on port ' + port);
});

module.exports = app;