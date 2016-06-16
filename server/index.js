'use strict';

const express = require('express');
const app = express();

const data = require('./data.json');

app.use('/', express.static(`${__dirname}/public`));

app.get('/visits', (req, res) => {
  res.status(200).json(data);
});

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send();
});

module.exports = app;
