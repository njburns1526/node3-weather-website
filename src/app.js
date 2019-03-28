const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// defne paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Nick',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nick',
    })
})

app.use('/help.html', express.static(publicDirectoryPath + '/help.html'))
app.use('/about.html', express.static(publicDirectoryPath + '/about.html'))

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.',
        })
    }
    res.send({
        products: [],
    })
})

// app.com
// app.com/help
// app.com/about
app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Page',
        error: 'Help article not found',
        name: 'Nick',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        error: 'Page not found',
        name: 'Nick',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})