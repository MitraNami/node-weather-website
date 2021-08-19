const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forcastByCity = require('./utils/forecastByCity');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public'); //static files
const viewsPath = path.join(__dirname, '..', 'templates/views'); //hbs views
const partialsPath = path.join(__dirname, '..', 'templates/partials'); //hbs partials


// Setup handlebars engine and veiws location
app.set('view engine', 'hbs');
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath, {extensions: ['html']}));


app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'weather app',
    name: 'Mitra Nami'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mitra Nami'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mitra Nami',
    msg: 'Enter your location'
  });
});

app.get('/weather', (req, res) => {
  const {address} = req.query;
  // address must be provided
  if (!address) {
    res.status(404).json({
      error: 'address must be provided'
    });
    return;
  }

  forcastByCity(address, (error, data) => {
    if (error) {
      res.status(404).json({error});
      return;
    }
    res.status(200).json({
      forcast: data,
      address
    });

  });

});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error- 404',
    msg: 'Help article not found',
    name: 'Mitra Nami'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error- 404',
    msg: 'Page not found',
    name: 'Mitra Nami'
  });
});



app.listen(port, () => console.log(`Server is up on port ${port}.`));