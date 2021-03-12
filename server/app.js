const express = require('express');
const path = require('path');
const axios = require('axios');
const { GITHUB_API_KEY } = require('../config');

const app = express();
const port = 3000;

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/';
const urlAnswers = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/';
const urlReviews = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/';
const urlInteractions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/interactions';
const urlProduct = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/';

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/questions', (req, res) => {
  axios.get(`${urlQuestions}?product_id=${req.query.product_id}&page=${req.query.page || 1}&count=${req.query.count || 4}`, {
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

// GET PRODUCT BY ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  axios.get(`${urlProduct + productId}`, {
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

app.post('/interactions', (req, res) => {
  axios.post(urlInteractions, req.body, {
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

// Get related products with photo thumbnails
app.get('/related/:productId', (req, res) => {
  axios.get(`${urlProduct + req.params.productId}/related`, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      const relatedProductDetails = response.data.map((product) => (
        axios.get(`${urlProduct + product}`, {
          headers: {
            Authorization: GITHUB_API_KEY,
          },
        })));

      const relatedProductStyles = response.data.map((product) => (
        axios.get(`${urlProduct + product}/styles`, {
          headers: {
            Authorization: GITHUB_API_KEY,
          },
        })));

      const relatedProductRating = response.data.map((product) => (
        axios.get(`${urlReviews}meta?product_id=${product}`, {
          headers: {
            Authorization: GITHUB_API_KEY,
          },
        })));

      const relatedProduct = [
        ...relatedProductDetails,
        ...relatedProductStyles,
        ...relatedProductRating];
      axios.all(relatedProduct)
        .then(axios.spread((...responses) => {
          const data = responses.map((product) => (
            product.data
          ));
          const divideData = Math.abs(data.length / 3);
          const dataRP = data.slice(0, divideData);
          const dataRPS = data.slice(divideData, divideData * 2);
          const dataRPR = data.slice(divideData * 2);
          const mergedData = (arr1, arr2, arr3) => {
            let result = [];
            result = arr1.map((obj) => {
              const index = arr2.findIndex((el) => Number(el.product_id) === obj.id);
              const index2 = arr3.findIndex((el) => Number(el.product_id) === obj.id);
              const toMergeStyle = index !== -1 ? arr2[index] : {};
              const toMergeRating = index2 !== -1 ? arr3[index2] : {};
              return {
                ...obj,
                ...toMergeStyle,
                ...toMergeRating,
              };
            });
            return result;
          };
          res.status(200).json(mergedData(dataRP, dataRPS, dataRPR));
        }))
        .catch(() => {
          res.status(404).send('Invalid');
        });
    });
});

app.get('/reviews', (req, res) => {
  // eslint-disable-next-line no-console
  const params = (req.query);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?page=${params.page}&count=${params.count}&sort=${params.sort}&product_id=${params.productId}`, {
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

app.post('/reviews', (req, res) => {
  // eslint-disable-next-line no-console
  axios.post(`${urlReviews}`, req.body, {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(response.status).send('Created');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put('/reviews/:id/helpful', (req, res) => {
  axios.put(`${urlReviews + req.params.id}/helpful`, '', {
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

app.put('/reviews/:id/report', (req, res) => {
  axios.put(`${urlReviews + req.params.id}/report`, '', {
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

// GET STYLES FOR A GIVEN PRODUCT
app.get('/products/:id/styles', (req, res) => {
  const productId = req.params.id;
  axios.get(`${urlProduct + productId}/styles`, {
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

// GET REVIEW METADATA FOR A GIVEN PRODUCT
app.get('/metadata/:id', (req, res) => {
  const productId = req.params.id;
  axios.get(`${urlReviews}meta?product_id=${productId}`, {
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

// POST ITEM TO CART
app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart', req.body, {
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

// GET CART
app.get('/cart', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/cart', {
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', port);
});
