const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/afiliados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(resp => {
    console.log(`Database is connected`)

  })
  .catch(error => {
    console.log(error);
    throw error;
  })