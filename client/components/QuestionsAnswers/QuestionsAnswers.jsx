import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import { GITHUB_API_KEY } from '../../../config';

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'; // productId comes from Props

const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.getQuestionListById = this.getQuestionListById.bind(this);
  }

  componentDidMount() {
    this.getQuestionListById(19378, 1, 2);
  }

  getQuestionListById(productId, page, count) {
    axios.get(`${urlQuestions}?product_id=${productId}&page=${page}&count=${count}`, {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((response) => {
        this.setState({
          questions: response.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        {questions.map((singleQuestion) => (
          <div key={singleQuestion.question_id}>
            <span>
              Q:
              {' '}
              { singleQuestion.question_body }
            </span>
            <span>
              { moment(singleQuestion.question_date).format('LL')}
            </span>
          </div>
        ))}
      </div>
    );
  }
};

export default QuestionsAnswers;
