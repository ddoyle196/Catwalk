/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { GITHUB_API_KEY } from '../../../config';
import Answers from './Answers';

const questionURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/';

const Question = class extends React.PureComponent {
  constructor(props) {
    super(props);

    const { question } = this.props;
    const { question_helpfulness } = question;
    this.state = {
      wasHelpful: question_helpfulness,
    };

    this.handleQuestionHelpfulness = this.handleQuestionHelpfulness.bind(this);
  }

  handleQuestionHelpfulness() {
    const { id } = this.props;
    const { question } = this.props;
    const { question_helpfulness } = question;
    axios.put(`${questionURL + id}/helpful`, '', {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          const wasHelpful = question_helpfulness + 1;
          this.setState({
            wasHelpful,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { question } = this.props;
    const { wasHelpful } = this.state;
    const {
      question_body,
      answers,
    } = question;
    return (
      <div>
        <div>
          <div className="question-blocks">
            <span>
              { `Q: ${question_body}`}
            </span>
          </div>
          <div className="question-options">
            <div>
              <div className="question-format">
                <span>
                  {'Helpful? '}
                  <u
                    onClick={() => this.handleQuestionHelpfulness()}
                    onKeyDown={this.handleButtonClick}
                    role="button"
                    tabIndex={0}
                  >
                    Yes
                  </u>
                  {` (${wasHelpful})`}
                </span>
              </div>
              <div className="question-format reset">
                <span>
                  <u>
                    Add Answer
                  </u>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {Object.values(answers).map((answer) => (
            <Answers
              key={answer.id}
              answer={answer}
            />
          ))}
        </div>
      </div>
    );
  }
};

Question.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    answers: PropTypes.shape.isRequired,
  }).isRequired,
};

export default Question;
