/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

const Question = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.AddQuestionHelpfulness = this.AddQuestionHelpfulness.bind(this);
  }

  AddQuestionHelpfulness() {
    const { id, handleQuestionHelpfulness } = this.props;
    handleQuestionHelpfulness(id);
  }

  render() {
    const { question } = this.props;
    const {
      question_body,
      answers,
      question_helpfulness,
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
                    className="pointer"
                    onClick={() => this.AddQuestionHelpfulness()}
                    onKeyDown={this.handleButtonClick}
                    role="button"
                    tabIndex={0}
                  >
                    Yes
                  </u>
                  {` (${question_helpfulness})`}
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
  handleQuestionHelpfulness: PropTypes.func.isRequired,
  question: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    answers: PropTypes.shape.isRequired,
  }).isRequired,
};

export default Question;
