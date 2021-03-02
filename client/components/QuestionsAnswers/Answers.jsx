/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import axios from 'axios';

const Answers = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulness: false,
    };
    this.AddAnswerHelpfulness = this.AddAnswerHelpfulness.bind(this);
  }

  handleAnswerReport(id) {
    axios.put(`/answers/${id}/report`)
      .then((result) => {
        if (result.status === 204) {
          this.setState({
            reported: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  AddAnswerHelpfulness() {
    const { id, AnswerHelpfulness } = this.props;
    const { helpfulness } = this.state;
    if (!helpfulness) {
      AnswerHelpfulness(id);
      this.setState({
        helpfulness: true,
      });
    }
  }

  render() {
    const { id, answer } = this.props;
    const { reported } = this.state;
    const {
      body,
      answerer_name,
      date,
      helpfulness,
    } = answer;
    return (
      <div className="qa-answer-box">
        <div className="qa-answer-letter">
          <span><b>A:</b></span>
        </div>
        <div className="qa-answer-body">
          <span>
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
            <u
              className="pointer"
              onClick={() => this.handleAnswerReport(id)}
              onKeyDown={this.handleButtonClick}
              role="button"
              tabIndex={0}
            >
              { reported ? 'Reported' : 'Report'}
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
