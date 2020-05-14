const express = require('express');
var cors = require('cors');
const app = express();

//imports
const properties = require('./config/properties');


//Database
require('./database');

//Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.json());

//Routes
app.use('/api/categories', require('./routes/categories.routing'));
app.use('/api/products', require('./routes/products.routing'));
app.use('/api/file', require('./routes/file.routing'));



//Running Server
app.listen(properties.PORT, () => {
  console.log('Afiliados Server running on port:', properties.PORT)
})