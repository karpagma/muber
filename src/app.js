'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/routes');

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
