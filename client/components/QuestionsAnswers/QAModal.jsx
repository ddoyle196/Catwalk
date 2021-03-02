import React from 'react';
import PropTypes from 'prop-types';

const QAModal = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitAnswerToQuestion = this.submitAnswerToQuestion.bind(this);
  }

  closeModal() {
    const { handleCloseModal } = this.props;
    handleCloseModal();
  }

  submitAnswerToQuestion() {
    const { handleSubmitAnswerToQuestion } = this.props;
    handleSubmitAnswerToQuestion();
    this.closeModal();
  }

  showModal() {
    const { showModal, children } = this.props;
    if (!showModal) {
      return null;
    }
    return (
      <div className="modal">
        <div className="modal-content">
          { children }
          <button
            type="submit"
            onClick={this.closeModal}
            className="modal-buttons close"
          >
            Close
          </button>
          <button
            type="button"
            onClick={this.submitAnswerToQuestion}
            className="modal-buttons"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.showModal()}
      </div>
    );
  }
};

QAModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmitAnswerToQuestion: PropTypes.func.isRequired,
};

export default QAModal;
