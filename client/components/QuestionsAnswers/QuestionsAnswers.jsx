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
      page: 1,
      count: 4,
    };

    this.getQuestionListById = this.getQuestionListById.bind(this);
    this.handleQuestionHelpfulness = this.handleQuestionHelpfulness.bind(this);
    this.handleMoreQuestions = this.handleMoreQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestionListById(19378, 'get'); // Check
  }

  handleMoreQuestions() {
    const { page } = this.state;
    const newPage = page + 1;
    this.setState({
      page: newPage,
    }, () => {
      this.getQuestionListById(19378, 'get'); // Check
    });
  }

  handleQuestionHelpfulness(id) {
    axios.put(`${urlQuestions + id}/helpful`, '', {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          this.getQuestionListById(19378, 'refresh'); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getQuestionListById(productId, type) {
    let fixedCall;
    const { questions, page, count } = this.state;
    console.log(page, count);
    if (type === 'get') {
      fixedCall = `${urlQuestions}?product_id=${productId}&page=${page}&count=${count}`;
    }
    if (type === 'refresh') {
      fixedCall = `${urlQuestions}?product_id=${productId}&page=${1}&count=${count * page}`;
    }
    axios.get(fixedCall, {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((response) => {
        if (type === 'get') {
          const newQuestions = [...questions, ...response.data.results];
          this.setState({
            questions: newQuestions,
          });
        }
        if (type === 'refresh') {
          this.setState({
            questions: response.data.results,
          });
        }
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
        <div>
          <button
            type="button"
            onClick={this.handleMoreQuestions}
          >
            More Questions
          </button>
        </div>
      </div>
    );
  }
};

export default QuestionsAnswers;
