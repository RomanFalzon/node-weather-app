const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//Define Express
const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set Settings to handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Set static directory to serve
app.use(express.static(publicDirectoryPath));

//Get requests
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Roman'
    });
});
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Roman'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Help Me',
        title: 'Help'
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide a location'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location} ={}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
           res.send({
               forecast: forecastData.summary,
               temp: forecastData.temp,
               location: location,
               address: req.query.address
           })
            
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Article Not Found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found'
    });
});
//Start Server
app.listen(port, () => {
    console.log('server started on port: '+port);
});