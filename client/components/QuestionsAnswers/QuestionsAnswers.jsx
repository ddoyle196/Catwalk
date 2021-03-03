import React from 'react';
import axios from 'axios';

import Question from './Questions';
import QAModal from './QAModal';

const pId = 19378;
const pName = 'Alberto Romper';

const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      questionsDisplayed: [],
      questionsList: [],
      page: 1,
      count: 4,
      haveMoreQuestions: true,
      showQuestionModal: false,
      newQuestion: {
        name: '',
        email: '',
        body: '',
        product_id: pId,
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
  }

  componentDidMount() {
    this.getQuestionListById(pId, 'get'); // Check
  }

  handleMoreQuestions() {
    const { page } = this.state;
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
    axios.put(`/questions/${id}/helpful`, '')
      .then((result) => {
        if (result.status === 204) {
          this.getQuestionListById(pId, 'refresh'); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmitQuestion() {
    const { newQuestion } = this.state;
    axios.post('/questions', newQuestion)
      .then((result) => {
        if (result.status === 201) {
          alert('Question Submited Successfully'); // Change later to a success modal
        }
      });
  }

  handleCloseModal() {
    this.setState({
      showQuestionModal: false,
    });
  }

  getQuestionListById(productId, type) {
    let fixedCall;
    const { questionsDisplayed, page, count } = this.state;
    if (type === 'get') {
      fixedCall = `/questions?product_id=${productId}&page=${page}&count=${count}`;
    }
    if (type === 'refresh') {
      fixedCall = `/questions?product_id=${productId}&page=${1}&count=${count * page}`;
    }
    axios.get(fixedCall)
      .then((response) => {
        if (response.data.results.length === 0) {
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
      })
      .catch((err) => {
        console.log(err); // Create error boundary
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

  AddMoreQuestionButton() {
    const { haveMoreQuestions } = this.state;
    if (haveMoreQuestions) {
      return (
        <button
          className="qa-buttons"
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
    const { questionsDisplayed, showQuestionModal } = this.state;
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
          <p className="qa-search-icon"> &#128269; </p>
        </div>
        {questionsDisplayed.map((singleQuestion) => (
          <Question
            key={singleQuestion.question_id}
            question={singleQuestion}
            id={singleQuestion.question_id}
            handleQuestionHelpfulness={this.handleQuestionHelpfulness}
          />
        ))}
        <div className="qa-options">
          {this.AddMoreQuestionButton()}
          <button
            className="qa-buttons"
            type="button"
            onClick={this.showQuestionModal}
          >
            ADD A QUESTION +
          </button>
          <QAModal
            showModal={showQuestionModal}
            handleCloseModal={this.handleCloseModal}
            handleSubmit={this.handleSubmitQuestion}
          >
            <div className="modal-title">
              <span>Ask Your Question!</span>
            </div>
            <div className="modal-subtitle">
              <span>{`About the ${pName}`}</span>
            </div>
            <div className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Name here..."
                className="modal-input"
                onChange={(e) => { this.inputChange(e, 'QModal'); }}
              />
              <input
                type="text"
                name="email"
                placeholder="Email here..."
                className="modal-input"
                onChange={(e) => { this.inputChange(e, 'QModal'); }}
              />
              <input
                type="text"
                name="body"
                placeholder="Add Your Question here..."
                className="modal-input-long"
                onChange={(e) => { this.inputChange(e, 'QModal'); }}
              />
            </div>
          </QAModal>
        </div>
      </div>
    );
  }
};

export default QuestionsAnswers;
