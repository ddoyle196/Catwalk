const express = require('express');
const path = require('path');
const axios = require('axios');
const { GITHUB_API_KEY } = require('../config');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/test', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('GET');
  res.send('Howdy!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', port);
});

app.get('/reviews', (req, res) => {
  // eslint-disable-next-line no-console
  const params = (req.query);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?page=${params.page}&count=${params.count}&sort="${params.sort}"&product_id=${params.productId}`, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      // console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/metadata/:id', (req, res) => {
  const productId = req.params.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta?product_id=${productId}`, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
