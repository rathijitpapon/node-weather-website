const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express();

// Define Paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Rathijit Paul",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Rathijit Paul",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: 'Help',
        helpText: "This is Help Page",
        name: "Rathijit Paul",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    geoCode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found.",
        name: "Rathijit Paul",
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found.",
        name: "Rathijit Paul",
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});