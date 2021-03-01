import React from 'react';
import axios from 'axios';

import { GITHUB_API_KEY } from '../../../config';
import Question from './Questions';

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'; // productId comes from Props
const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.getQuestionListById = this.getQuestionListById.bind(this);
    this.handleQuestionHelpfulness = this.handleQuestionHelpfulness.bind(this);
  }

  componentDidMount() {
    this.getQuestionListById(19378, 1, 4); // Check
  }

  handleQuestionHelpfulness(id) {
    axios.put(`${urlQuestions + id}/helpful`, '', {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          this.getQuestionListById(19378, 1, 4); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log(err); // Create error boundary
      });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        {questions.map((singleQuestion) => (
          <Question
            key={singleQuestion.question_id}
            question={singleQuestion}
            id={singleQuestion.question_id}
            handleQuestionHelpfulness={this.handleQuestionHelpfulness}
          />
        ))}
      </div>
    );
  }
};

export default QuestionsAnswers;
