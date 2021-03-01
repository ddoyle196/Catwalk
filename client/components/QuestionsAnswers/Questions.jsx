/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Question = ({ question_body, question_helpfulness, answers }) => (
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
              <u>
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
        <div key={answer.id}>
          <div>
            <span>
              { `A: ${answer.body}`}
            </span>
          </div>
          <div className="question-format">
            <span>
              { `by ${answer.answerer_name}, `}
            </span>
            <span>
              { moment(answer.date).format('LL')}
            </span>
          </div>
          <div className="question-format">
            <span>
              {'Helpful? '}
              <u>
                Yes
              </u>
              {` (${answer.helpfulness})`}
            </span>
          </div>
          <div className="question-format reset">
            <span>
              <u>
                Report
              </u>
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Question.propTypes = {
  question_body: PropTypes.string.isRequired,
  question_helpfulness: PropTypes.number.isRequired,
  answers: PropTypes.shape.isRequired,
};

export default Question;
