import React from 'react';
import axios from 'axios';

import { GITHUB_API_KEY } from '../../../config';
import Question from './Questions';
import QAModal from './QAModal';

const urlQuestions = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/'; // productId comes from Props
const pId = 19378;

const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      questions: [],
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
    const { name } = target;
    const { newQuestion } = this.state;
    const inputNewQuestion = { ...newQuestion };
    inputNewQuestion[name] = e.target.value;
    this.setState({
      newQuestion: inputNewQuestion,
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
          this.getQuestionListById(pId, 'refresh'); // Check
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmitQuestion() {
    const { newQuestion } = this.state;
    axios.post(`${urlQuestions}`, newQuestion, {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
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
    const { questions, page, count } = this.state;
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
        if (response.data.results.length === 0) {
          this.setState({
            haveMoreQuestions: false,
          });
        }
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

  showQuestionModal() {
    this.setState({
      showQuestionModal: true,
    });
  }

  AddMoreQuestionButton() {
    const { haveMoreQuestions } = this.state;
    if (haveMoreQuestions) {
      return (
        <div>
          <button
            type="button"
            onClick={this.handleMoreQuestions}
          >
            More Answered Questions
          </button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { questions, showQuestionModal } = this.state;
    return (
      <div>
        <div>
          <span>Questions & Answers</span>
        </div>
        {questions.map((singleQuestion) => (
          <Question
            key={singleQuestion.question_id}
            question={singleQuestion}
            id={singleQuestion.question_id}
            handleQuestionHelpfulness={this.handleQuestionHelpfulness}
          />
        ))}
        {this.AddMoreQuestionButton()}
        <button
          type="button"
          onClick={this.showQuestionModal}
        >
          Add a Question+
        </button>
        <QAModal
          showModal={showQuestionModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={this.handleSubmitQuestion}
        >
          <span>Add a Question here!</span>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name here..."
              className="modal-input"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email here..."
              className="modal-input"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="body"
              placeholder="Add Your Question here..."
              className="modal-input"
              onChange={this.handleInputChange}
            />
          </div>
        </QAModal>
      </div>
    );
  }
};

export default QuestionsAnswers;
