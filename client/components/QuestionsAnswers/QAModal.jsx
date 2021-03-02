import React from 'react';
import PropTypes from 'prop-types';

const QAModal = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { handleCloseModal } = this.props;
    handleCloseModal();
  }

  showModal() {
    const { showModal, children } = this.props;
    if (!showModal) {
      return null;
    }
    return (
      <div>
        <div>
          { children }
        </div>
        <button
          type="button"
          onClick={this.closeModal}
        >
          Close
        </button>
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
};

export default QAModal;
