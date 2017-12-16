'use strict';

const app = require('./app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/muber', {
  useMongoClient: true
});

app.listen(3000, () => {
  console.log('app is listening on port 3000'); // eslint-disable-line
});
