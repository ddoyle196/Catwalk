/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers';
import QAModal from './QAModal';

const Question = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      helpfulness: false,
      page: 1,
      count: 2,
      haveMoreAnswers: true,
      showAnswerModal: false,
      newAnswer: {
        body: '',
        name: '',
        email: '',
      },
    };

    this.getAnswersFromQuestionId = this.getAnswersFromQuestionId.bind(this);
    this.AddQuestionHelpfulness = this.AddQuestionHelpfulness.bind(this);
    this.handleAnswerHelpfulness = this.handleAnswerHelpfulness.bind(this);
    this.handleMoreAnswers = this.handleMoreAnswers.bind(this);
    this.AddAnswerButton = this.AddAnswerButton.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmitAnswerToQuestion = this.handleSubmitAnswerToQuestion.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getAnswersFromQuestionId('get');
  }

  handleMoreAnswers() {
    const { page } = this.state;
    const newPage = page + 1;
    this.setState({
      page: newPage,
    }, () => {
      this.getAnswersFromQuestionId('get'); // Check
    });
  }

  handleAnswerHelpfulness(id) {
    axios.put(`/answers/${id}/helpful`)
      .then((result) => {
        if (result.status === 204) {
          this.getAnswersFromQuestionId('refresh'); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCloseModal() {
    this.setState({
      showAnswerModal: false,
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const { newAnswer } = this.state;
    const inputNewAnswer = { ...newAnswer };
    inputNewAnswer[name] = e.target.value;
    this.setState({
      newAnswer: inputNewAnswer,
    });
  }

  handleSubmitAnswerToQuestion() {
    const { newAnswer } = this.state;
    const { id } = this.props;
    axios.post(`/questions/${id}/answers`, newAnswer)
      .then((result) => {
        if (result.status === 201) {
          alert('Answer Submited Successfully'); // Change later to a success modal
        }
      });
  }

  getAnswersFromQuestionId(type) {
    const { id } = this.props;
    const { answers, page, count } = this.state;
    let fixedCall;

    if (type === 'get') {
      fixedCall = `/questions/${id}/answers?page=${page}&count=${count}`;
    }
    if (type === 'refresh') {
      fixedCall = `/questions/${id}/answers?page=${1}&count=${count * page}`;
    }

    axios.get(fixedCall)
      .then((response) => {
        if (response.data.results.length === 0) {
          this.setState({
            haveMoreAnswers: false,
          });
        }
        if (type === 'get') {
          const newAnswers = [...answers, ...response.data.results];
          this.setState({
            answers: newAnswers,
          });
        }
        if (type === 'refresh') {
          this.setState({
            answers: response.data.results,
          });
        }
      })
      .catch((err) => {
        console.log(err); // Create error boundary
      });
  }

  AddAnswerButton() {
    const { haveMoreAnswers } = this.state;
    if (haveMoreAnswers) {
      return (
        <div>
          <b
            className="qa-more-answers pointer"
            onClick={this.handleMoreAnswers}
            onKeyDown={this.handleButtonClick}
            role="button"
            tabIndex={0}
          >
            LOAD MORE ANSWERS
          </b>
        </div>
      );
    }
    return null;
  }

  AddQuestionHelpfulness() {
    const { id, handleQuestionHelpfulness } = this.props;
    const { helpfulness } = this.state;
    if (!helpfulness) {
      handleQuestionHelpfulness(id);
      this.setState({
        helpfulness: true,
      });
    }
  }

  showAnswerModal() {
    this.setState({
      showAnswerModal: true,
    });
  }

  render() {
    const { question, pName } = this.props;
    const { answers, showAnswerModal } = this.state;
    const {
      question_body,
      question_helpfulness,
    } = question;
    return (
      <div className="qa-question-box">
        <div className="qa-question-single">
          <div className="qa-question-letter">
            <span><b>Q:</b></span>
          </div>
          <div className="qa-question-body">
            <span>
              <b>
                { ` ${question_body}?`}
              </b>
            </span>
          </div>
          <div className="qa-questions-options ">
            <div className="qa-options-format">
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
            <div className="qa-options-format qa-reset-format">
              <span>
                <u
                  className="pointer"
                  onClick={() => this.showAnswerModal()}
                  onKeyDown={this.handleButtonClick}
                  role="button"
                  tabIndex={0}
                >
                  Add Answer
                </u>
              </span>
            </div>
          </div>
        </div>
        {answers.map((answer) => (
          <Answers
            key={answer.answer_id}
            id={answer.answer_id}
            answer={answer}
            AnswerHelpfulness={this.handleAnswerHelpfulness}
            AnswerReport={this.handleAnswerReport}
          />
        ))}
        {this.AddAnswerButton()}
        <QAModal
          showModal={showAnswerModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={this.handleSubmitAnswerToQuestion}
        >
          <div className="modal-title">
            <span>Submit your Answer</span>
          </div>
          <div className="modal-subtitle">
            <span>{`${pName}: ${question_body}`}</span>
          </div>
          <div className="modal-form">
            <div className="modal-name">
              <span
                className="modal-input-titles"
              >
                What is your nickname: *
              </span>
              <input
                type="text"
                name="name"
                placeholder="Example: jack543!"
                className="modal-input"
                onChange={this.handleInputChange}
                maxLength="60"
              />
              <span
                className="modal-little-messages"
              >
                For privacy reasons, do not use your full name or email address
              </span>
            </div>
            <div className="modal-email">
              <span
                className="modal-input-titles"
              >
                Your email: *
              </span>
              <input
                type="text"
                name="email"
                placeholder="Example: jack@email.com"
                className="modal-input"
                onChange={this.handleInputChange}
                maxLength="60"
              />
              <span
                className="modal-little-messages"
              >
                For authentication reasons, you will not be emailed” will appear.
              </span>
            </div>
            <div className="modal-body">
              <span
                className="modal-input-titles"
              >
                Your Question: *
              </span>
              <textarea
                type="text"
                name="body"
                placeholder="Add Your Answer here..."
                className="modal-input"
                onChange={this.handleInputChange}
                cols="40"
                rows="5"
                maxLength="1000"
              />
            </div>
          </div>
        </QAModal>
      </div>
    );
  }
};

Question.propTypes = {
  id: PropTypes.number.isRequired,
  handleQuestionHelpfulness: PropTypes.func.isRequired,
  pName: PropTypes.string.isRequired,
  question: PropTypes.shape({
    question_body: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
  }).isRequired,
};

export default Question;
