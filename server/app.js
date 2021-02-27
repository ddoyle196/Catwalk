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

// GET PRODUCT BY ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productId}`, {
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

// GET STYLES FOR A GIVEN PRODUCT
app.get('/products/:id/styles', (req, res) => {
  const productId = req.params.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productId}/styles`, {
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

// GET REVIEW METADATA FOR A GIVEN PRODUCT
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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', port);
});
