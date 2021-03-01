/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Answers = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.AddAnswerHelpfulness = this.AddAnswerHelpfulness.bind(this);
  }

  AddAnswerHelpfulness() {
    const { id, AnswerHelpfulness } = this.props;
    AnswerHelpfulness(id);
  }

  render() {
    const { answer } = this.props;
    const {
      body,
      answerer_name,
      date,
      helpfulness,
    } = answer;
    return (
      <div>
        <div>
          <span>
            <b>
              A:
            </b>
            { ` ${body}`}
          </span>
        </div>
        <div className="question-format">
          <span>
            { `by ${answerer_name}, `}
          </span>
          <span>
            { moment(date).format('LL')}
          </span>
        </div>
        <div className="question-format">
          <span>
            {'Helpful? '}
            <u
              className="pointer"
              onClick={() => this.AddAnswerHelpfulness()}
              onKeyDown={this.handleButtonClick}
              role="button"
              tabIndex={0}
            >
              Yes
            </u>
            {` (${helpfulness})`}
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
    );
  }
};

Answers.propTypes = {
  id: PropTypes.number.isRequired,
  AnswerHelpfulness: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    body: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
  }).isRequired,
};

export default Answers;
