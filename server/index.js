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

module.exports = app;
