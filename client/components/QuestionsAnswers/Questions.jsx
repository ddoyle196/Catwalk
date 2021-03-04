/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answers from './Answers';
import Modal from '../shared/Modal';

const handleEmailValidation = (email) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!email.match(mailformat);
};

const handleUrlValidation = (str) => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return !!regexp.test(str);
};

const Question = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      helpfulness: false,
      page: 1,
      count: 2,
      haveMoreAnswers: true,
      collapseAnswers: false,
      showAnswerModal: false,
      showNotificationModal: false,
      notificationCode: '',
      notificationMessage: '',
      answerWithPhoto: false,
      photos: {
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
      },
      newAnswer: {
        body: '',
        name: '',
        email: '',
      },
      validateAnswerInput: {
        name: true,
        email: true,
        body: true,
        photo: true,
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
    this.showValidationErrors = this.showValidationErrors.bind(this);
    this.handleCollapseAnswers = this.handleCollapseAnswers.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
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
      .catch(() => {
        this.setState({
          showNotificationModal: true,
          notificationCode: 'error',
          notificationMessage: 'There was an error in the server, please try later',
        });
      });
  }

  handleCloseModal(modalType) {
    if (modalType === 'submit-qa') {
      this.setState({
        showAnswerModal: false,
        validateAnswerInput: {
          name: true,
          email: true,
          body: true,
          photo: true,
        },
        answerWithPhoto: false,
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

  handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const { newAnswer, photos } = this.state;
    const inputNewAnswer = { ...newAnswer };
    const inputNewPhoto = { ...photos };
    if (name.includes('photo')) {
      inputNewPhoto[name] = e.target.value;
    } else {
      inputNewAnswer[name] = e.target.value;
    }
    this.setState({
      newAnswer: inputNewAnswer,
      photos: inputNewPhoto,
    });
  }

  handleSubmitAnswerToQuestion() {
    const { newAnswer, photos, answerWithPhoto } = this.state;
    const { id } = this.props;
    const photoArray = Object.values(photos).filter((photo) => photo !== '');
    const validatePhotos = photoArray.map((photo) => handleUrlValidation(photo));
    const validateAnswer = {
      name: newAnswer.name.length > 3,
      body: newAnswer.body.length > 3,
      email: newAnswer.email.length > 3 && handleEmailValidation(newAnswer.email),
    };
    if (validateAnswer.name
      && validateAnswer.body
      && validateAnswer.email
      && (
        (answerWithPhoto && !validatePhotos.includes(false))
        || (!answerWithPhoto)
      )
    ) {
      const newPhotoAnswer = { ...newAnswer, photos: photoArray };
      axios.post(`/questions/${id}/answers`, newPhotoAnswer)
        .then((result) => {
          if (result.status === 201) {
            this.setState({
              showAnswerModal: false,
              showNotificationModal: true,
              notificationCode: 'success',
              notificationMessage: 'Question Submited Successfully',
              validateAnswerInput: {
                name: true,
                email: true,
                body: true,
                photo: true,
              },
              answerWithPhoto: false,
            });
          }
        });
    } else {
      validateAnswer.photo = !validatePhotos.includes(false);
      this.setState({
        validateAnswerInput: validateAnswer,
      });
    }
  }

  handleCollapseAnswers() {
    const { collapseAnswers } = this.state;
    if (!collapseAnswers) {
      this.setState({
        collapseAnswers: true,
      });
    } else {
      this.setState({
        collapseAnswers: false,
      });
    }
  }

  handlePhotoSubmit() {
    this.setState({
      answerWithPhoto: true,
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
      .catch(() => {
        this.setState({
          showNotificationModal: true,
          notificationCode: 'error',
          notificationMessage: 'There was an error in the server, please try later',
        });
      });
  }

  AddAnswerButton() {
    const { haveMoreAnswers, collapseAnswers } = this.state;
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
    return (
      <div>
        <b
          className="qa-collapse-answers pointer"
          onClick={this.handleCollapseAnswers}
          onKeyDown={this.handleButtonClick}
          role="button"
          tabIndex={0}
        >
          { collapseAnswers ? 'SHOW ANSWERS' : 'COLLAPSE ANSWERS'}
        </b>
      </div>
    );
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

  showValidationErrors(input) {
    const { validateAnswerInput } = this.state;
    if (!validateAnswerInput[input]) {
      if (input === 'email') {
        return (
          <div>
            <span
              className="modal-error-message"
            >
              {`Please enter an ${input} with the correct format`}
            </span>
          </div>
        );
      }
      if (input === 'photo') {
        return (
          <div>
            <span
              className="modal-error-message"
            >
              {`One or many ${input}'s url are invalid, check again and submit`}
            </span>
          </div>
        );
      }
      return (
        <div>
          <span
            className="modal-error-message"
          >
            {`Please enter a ${input === 'body' ? 'question' : 'nickname'} with more than 3 letters`}
          </span>
        </div>
      );
    }
    return null;
  }

  render() {
    const { question, pName } = this.props;
    const {
      answers,
      showAnswerModal,
      validateAnswerInput,
      showNotificationModal,
      notificationCode,
      notificationMessage,
      collapseAnswers,
      answerWithPhoto,
    } = this.state;
    const {
      question_body,
      question_helpfulness,
    } = question;
    const {
      name,
      body,
      email,
      photo,
    } = validateAnswerInput;
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
                  className="qa-question-helpfulness pointer"
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
                  className="qa-add-answer pointer"
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
            collapseAnswers={collapseAnswers}
          />
        ))}
        {this.AddAnswerButton()}
        <Modal
          showModal={showNotificationModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={() => {}}
          modalType="notification"
          modalCode={notificationCode}
        >
          <span
            className="modal-text"
          >
            { notificationMessage }
          </span>
        </Modal>
        <Modal
          showModal={showAnswerModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={this.handleSubmitAnswerToQuestion}
          modalType="submit-qa"
          modalCode=""
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
                className={`modal-input ${name ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="60"
              />
              {this.showValidationErrors('name')}
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
                className={`modal-input ${email ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="60"
              />
              {this.showValidationErrors('email')}
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
                Your Answer: *
              </span>
              <textarea
                type="text"
                name="body"
                placeholder="Add Your Answer here..."
                className={`modal-input ${body ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                cols="40"
                rows="5"
                maxLength="1000"
              />
              {this.showValidationErrors('body')}
            </div>
            <u
              className={`modal-add-photo ${!answerWithPhoto ? '' : 'no-display'} pointer`}
              onClick={this.handlePhotoSubmit}
              onKeyDown={this.handleButtonClick}
              role="button"
              tabIndex={0}
            >
              Add Photo
            </u>
            <div className={`modal-photo ${answerWithPhoto ? '' : 'no-display'}`}>
              <span
                className="modal-input-titles"
              >
                Upload your photos:
              </span>
              {this.showValidationErrors('photo')}
              <input
                type="url"
                name="photo1"
                placeholder="Photo URL Here... "
                className={`modal-input ${photo ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo2"
                placeholder="Photo URL Here... "
                className={`modal-input ${photo ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo3"
                placeholder="Photo URL Here... "
                className={`modal-input ${photo ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo4"
                placeholder="Photo URL Here... "
                className={`modal-input ${photo ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo5"
                placeholder="Photo URL Here... "
                className={`modal-input ${photo ? '' : 'modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
            </div>
          </div>
        </Modal>
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
