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
    if (modalType === 'submit') {
      return (
        <div className="modal-submit">
          <div className="modal-content">
            { children }
            <div className="modal-buttons">
              <button
                type="button"
                onClick={this.submit}
                className="modal-submit-button"
              >
                Submit
              </button>
              <button
                type="submit"
                onClick={() => { this.closeModal('submit'); }}
                className="modal-close"
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
      }, 3000);
      return (
        <div className="modal-notification">
          <div className={`modal-content ${modalCode === 'success' ? 'modal-success' : 'modal-error'}`}>
            { children }
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
