import React from 'react';
import PropTypes from 'prop-types';

const Modal = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
    this.modalType = this.modalType.bind(this);
  }

  closeModal(modalType) {
    const { handleCloseModal } = this.props;
    handleCloseModal(modalType);
  }

  submit() {
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  modalType() {
    const { modalType, children, modalCode } = this.props;
    if (modalType === 'submit-qa') {
      return (
        <div className="qa modal-submit">
          <div className="qa modal-content">
            { children }
            <div className="qa modal-buttons">
              <button
                type="button"
                onClick={this.submit}
                className="qa modal-submit-button"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => { this.closeModal('submit-qa'); }}
                className="qa modal-close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (modalType === 'notification') {
      setTimeout(() => {
        this.closeModal('notification');
      }, 2000);
      return (
        <div className="modal-notification">
          <div className={`modal-content ${modalCode === 'success' ? 'modal-success' : 'modal-error'}`}>
            { children }
          </div>
        </div>
      );
    }
    if (modalType === 'image') {
      return (
        <div
          className="modal-image"
          onClick={() => this.closeModal('image')}
          role="button"
          onKeyDown={this.handleButtonClick}
          tabIndex={0}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>
      );
    }
    if (modalType === 'image') {
      return (
        <div
          className="modal-image"
          onClick={() => this.closeModal('comparison')}
          role="button"
          onKeyDown={this.handleButtonClick}
          tabIndex={0}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>
      );
    }
    if (modalType === 'product-comparison') {
      return (
        <div
          className="modal-image"
          onClick={() => this.closeModal('image')}
          role="button"
          onKeyDown={this.handleButtonClick}
          tabIndex={0}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>
      );
    }
    if (modalType === 'submit-rr') {
      return (
        <div className="rr-modal-submit">
          <div className="rr-modal-content">
            { children }
            <div className="rr-modal-buttons">
              <button
                type="button"
                onClick={this.submit}
                className="rr-button"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={() => { this.closeModal('submit-rr'); }}
                className="rr-button"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  showModal() {
    const { showModal } = this.props;
    if (!showModal) {
      return null;
    }
    return this.modalType();
  }

  render() {
    return (
      <div>
        {this.showModal()}
      </div>
    );
  }
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  modalCode: PropTypes.string.isRequired,
};

export default Modal;
