const express = require('express');
const path = require('path');
const axios = require('axios');
const { GITHUB_API_KEY } = require('../config');

const app = express();
const port = 3000;

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'; // productId comes from Props
const urlAnswers = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/';
const pId = 19378;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/test', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('GET');
  res.send('Howdy!');
});

app.get('/questions', (req, res) => {
  axios.get(`${urlQuestions}?product_id=${pId}&page=${req.query.page || 1}&count=${req.query.count || 4}`, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).json(response.data);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', port);
});
