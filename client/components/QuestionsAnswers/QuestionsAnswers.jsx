import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';

import Question from './Questions';
import Modal from '../shared/Modal';

const handleEmailValidation = (email) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!email.match(mailformat);
};

let apiCalls = 0;

const QuestionsAnswers = class extends React.PureComponent {
  constructor(props) {
    super(props);
    const { pId } = this.props;
    this.state = {
      questionsDisplayed: [],
      questionsList: [],
      page: 1,
      count: 4,
      noQuestions: false,
      haveMoreQuestions: true,
      showQuestionModal: false,
      showNotificationModal: false,
      notificationCode: '',
      notificationMessage: '',
      newQuestion: {
        name: '',
        email: '',
        body: '',
        product_id: pId,
      },
      validateQuestionInput: {
        name: true,
        email: true,
        body: true,
      },
    };

    this.getQuestionListById = this.getQuestionListById.bind(this);
    this.handleQuestionHelpfulness = this.handleQuestionHelpfulness.bind(this);
    this.handleMoreQuestions = this.handleMoreQuestions.bind(this);
    this.AddMoreQuestionButton = this.AddMoreQuestionButton.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleInputChangeSort = this.handleInputChangeSort.bind(this);
    this.showValidationErrors = this.showValidationErrors.bind(this);
  }

  componentDidMount() {
    const { pId } = this.props;
    this.getQuestionListById(pId, 'get'); // Check
  }

  handleMoreQuestions() {
    const { page } = this.state;
    const { pId } = this.props;
    const newPage = page + 1;
    this.setState({
      page: newPage,
    }, () => {
      this.getQuestionListById(pId, 'get'); // Check
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const { name, value } = target;
    const { newQuestion } = this.state;
    const inputNewQuestion = { ...newQuestion };
    inputNewQuestion[name] = value;
    this.setState({
      newQuestion: inputNewQuestion,
    });
  }

  handleInputChangeSort(e) {
    const { target } = e;
    const { value } = target;
    const { questionsList } = this.state;
    let newQuestionList;
    if (value.length >= 3) {
      newQuestionList = questionsList
        .filter((question) => question.question_body.includes(value));
      this.setState({
        questionsDisplayed: newQuestionList,
      });
    } else {
      this.setState({
        questionsDisplayed: questionsList,
      });
    }
  }

  handleQuestionHelpfulness(id) {
    const { pId } = this.props;
    axios.put(`/questions/${id}/helpful`, '')
      .then((result) => {
        if (result.status === 204) {
          this.getQuestionListById(pId, 'refresh'); // Check
        }
      })
      .catch(() => {
        this.setState({
          showNotificationModal: true,
          notificationCode: 'error',
          notificationMessage: 'There was an error in the server, please try later',
        });
      });
  }

  handleSubmitQuestion() {
    const { newQuestion } = this.state;
    const validateQuestion = {
      name: newQuestion.name.length > 3,
      body: newQuestion.body.length > 3,
      email: newQuestion.email.length > 3 && handleEmailValidation(newQuestion.email),
    };
    if (validateQuestion.name && validateQuestion.body && validateQuestion.email) {
      axios.post('/questions', newQuestion)
        .then((result) => {
          if (result.status === 201) {
            this.setState({
              showQuestionModal: false,
              showNotificationModal: true,
              notificationCode: 'success',
              notificationMessage: 'Question Submited Successfully',
            });
          }
        });
    } else {
      this.setState({
        validateQuestionInput: validateQuestion,
      });
    }
  }

  handleCloseModal(modalType) {
    if (modalType === 'submit-qa') {
      this.setState({
        showQuestionModal: false,
        validateQuestionInput: {
          name: true,
          email: true,
          body: true,
        },
      });
    }
    if (modalType === 'notification') {
      this.setState({
        showNotificationModal: false,
        notificationCode: '',
        notificationMessage: '',
      });
    }
  }

  getQuestionListById(productId, type) {
    let fixedCall;
    const {
      questionsDisplayed,
      page,
      count,
    } = this.state;
    if (type === 'get') {
      fixedCall = `/questions?product_id=${productId}&page=${page}&count=${count}`;
    }
    if (type === 'refresh') {
      fixedCall = `/questions?product_id=${productId}&page=${1}&count=${count * page}`;
    }
    axios.get(fixedCall)
      .then((response) => {
        if (response.data.results.length === 0 && apiCalls === 0) {
          this.setState({
            haveMoreQuestions: false,
            noQuestions: true,
          });
        } else if (response.data.results.length === 0) {
          this.setState({
            haveMoreQuestions: false,
          });
        }
        if (type === 'get') {
          const newQuestions = [...questionsDisplayed, ...response.data.results];
          this.setState({
            questionsDisplayed: newQuestions,
            questionsList: newQuestions,
          });
        }
        if (type === 'refresh') {
          this.setState({
            questionsDisplayed: response.data.results,
            questionsList: response.data.results,
          });
        }
        apiCalls += 1;
      })
      .catch(() => {
        this.setState({
          showNotificationModal: true,
          notificationCode: 'error',
          notificationMessage: 'There was an error in the server, please try later',
        });
      });
  }

  inputChange(e, action) {
    if (action === 'QModal') {
      this.handleInputChange(e);
    }
    if (action === 'SortQuestions') {
      this.handleInputChangeSort(e);
    }
  }

  showQuestionModal() {
    this.setState({
      showQuestionModal: true,
    });
  }

  showNotificationModal() {
    this.setState({
      showNotificationModal: true,
    });
  }

  showValidationErrors(input) {
    const { validateQuestionInput } = this.state;
    if (!validateQuestionInput[input]) {
      if (input === 'email') {
        return (
          <div>
            <span
              className="qa modal-error-message"
            >
              {`Please enter an ${input} with the correct format`}
            </span>
          </div>
        );
      }
      return (
        <div>
          <span
            className="qa modal-error-message"
          >
            {`Please enter a ${input === 'body' ? 'question' : 'nickname'} with more than 3 letters`}
          </span>
        </div>
      );
    }
    return null;
  }

  AddMoreQuestionButton() {
    const { haveMoreQuestions } = this.state;
    if (haveMoreQuestions) {
      return (
        <button
          className="qa-more-questions qa-buttons"
          type="button"
          onClick={this.handleMoreQuestions}
        >
          MORE ANSWERED QUESTIONS
        </button>
      );
    }
    return null;
  }

  render() {
    const {
      questionsDisplayed,
      showQuestionModal,
      validateQuestionInput,
      showNotificationModal,
      notificationCode,
      notificationMessage,
      noQuestions,
    } = this.state;
    const { pName } = this.props;
    const { name, body, email } = validateQuestionInput;
    return (
      <div className="qa-box">
        <div className="qa-title">
          <span>QUESTIONS & ANSWERS</span>
        </div>
        <div className="qa-question-input">
          <input
            type="text"
            name="name"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            className="qa-input"
            onChange={(e) => { this.inputChange(e, 'SortQuestions'); }}
          />
          <div className="qa-search-icon">
            <Icon icon={magnifyIcon} width="20" height="20" />
          </div>
        </div>
        <div className={`qa-question-scroll ${noQuestions ? 'no-display' : ''}`}>
          {questionsDisplayed.map((singleQuestion) => (
            <Question
              key={singleQuestion.question_id}
              question={singleQuestion}
              id={singleQuestion.question_id}
              pName={pName}
              handleQuestionHelpfulness={this.handleQuestionHelpfulness}
            />
          ))}
        </div>
        <div className="qa-options">
          {this.AddMoreQuestionButton()}
          <button
            className="qa-add-question qa-buttons"
            type="button"
            onClick={this.showQuestionModal}
          >
            ADD A QUESTION +
          </button>
          <Modal
            showModal={showNotificationModal}
            handleCloseModal={this.handleCloseModal}
            handleSubmit={() => {}}
            modalType="notification"
            modalCode={notificationCode}
          >
            <span className="modal-text">{ notificationMessage }</span>
          </Modal>
          <Modal
            showModal={showQuestionModal}
            handleCloseModal={this.handleCloseModal}
            handleSubmit={this.handleSubmitQuestion}
            modalType="submit-qa"
            modalCode=""
          >
            <div className="qa modal-title">
              <span>Ask Your Question!</span>
            </div>
            <div className="qa modal-subtitle">
              <span>{`About the ${pName}`}</span>
            </div>
            <div className="qa modal-form">
              <div className="qa modal-name">
                <span
                  className="qa modal-input-titles"
                >
                  What is your nickname: *
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Example: jackson11!"
                  className={`qa modal-input ${name ? '' : 'modal-input-error'}`}
                  onChange={(e) => { this.inputChange(e, 'QModal'); }}
                  maxLength="60"
                />
                {this.showValidationErrors('name')}
                <span
                  className="qa modal-little-messages"
                >
                  For privacy reasons, do not use your full name or email address
                </span>
              </div>
              <div className="qa modal-email">
                <span
                  className="qa modal-input-titles"
                >
                  Your email: *
                </span>
                <input
                  type="text"
                  name="email"
                  placeholder="Why did you like the product or not?"
                  className={`qa modal-input ${email ? '' : 'modal-input-error'}`}
                  onChange={(e) => { this.inputChange(e, 'QModal'); }}
                  maxLength="60"
                />
                {this.showValidationErrors('email')}
                <span
                  className="qa modal-little-messages"
                >
                  For authentication reasons, you will not be emailed.
                </span>
              </div>
              <div className="qa modal-body">
                <span
                  className="qa modal-input-titles"
                >
                  Your Question: *
                </span>
                <textarea
                  type="text"
                  name="body"
                  placeholder="Add Your Question here..."
                  className={`qa modal-input ${body ? '' : 'modal-input-error'}`}
                  onChange={(e) => { this.inputChange(e, 'QModal'); }}
                  cols="40"
                  rows="5"
                  maxLength="1000"
                />
                {this.showValidationErrors('body')}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
};

QuestionsAnswers.propTypes = {
  pId: PropTypes.number.isRequired,
  pName: PropTypes.string.isRequired,
};

export default QuestionsAnswers;
