import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import Config from '../../../config';

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/';

const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      config: '',
    };

    this.getQuestionListById = this.getQuestionListById.bind(this);
  }

  componentDidMount() {
    this.getQuestionListById(19378, 1, 5);
  }

  getQuestionListById(productId, page, count) {
    axios.get(`${urlQuestions}?product_id=${productId}&page=${page}&count=${count}`, {
      headers: {
        Authorization: Config.GITHUB_API_KEY,
      },
    })
      .then((response) => {
        this.setState({
          config: JSON.stringify(response.data),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { config } = this.state;
    return (
      <div>{ config }</div>
    );
  }
};

export default QuestionsAnswers;
