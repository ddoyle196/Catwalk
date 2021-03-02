const express = require('express');
const path = require('path');
const axios = require('axios');
const { GITHUB_API_KEY } = require('../config');

const app = express();
const port = 3000;

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/';
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
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.get('/questions/:productId/answers', (req, res) => {
  axios.get(`${urlQuestions + req.params.productId}/answers?page=${req.query.page || 1}&count=${req.query.count || 2}`, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.post('/questions', (req, res) => {
  axios.post(`${urlQuestions}`, req.body, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(201).send('Created');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.post('/questions/:productId/answers', (req, res) => {
  axios.post(`${urlQuestions + req.params.productId}/answers`, req.body, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(201).send('Created');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.put('/questions/:productId/helpful', (req, res) => {
  axios.put(`${urlQuestions + req.params.productId}/helpful`, '', {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(204).send('No Content');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.put('/questions/:productId/report', (req, res) => {
  axios.put(`${urlQuestions + req.params.productId}/report`, '', {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(204).send('No Content');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.put('/answers/:answerId/helpful', (req, res) => {
  axios.put(`${urlAnswers + req.params.answerId}/helpful`, '', {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(204).send('No Content');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
});

app.put('/answers/:answerId/report', (req, res) => {
  axios.put(`${urlAnswers + req.params.answerId}/report`, '', {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then(() => {
      res.status(204).send('No Content');
    })
    .catch(() => {
      res.status(404).send('Invalid');
    });
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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', port);
});
