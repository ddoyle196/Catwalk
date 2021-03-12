/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from '../shared/Modal';
import ImageThumbnails from './ImageThumbnails';

const Answers = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulness: false,
      showNotificationModal: false,
      notificationCode: '',
      notificationMessage: '',
      showImageModal: false,
      imageUrl: '',
    };
    this.AddAnswerHelpfulness = this.AddAnswerHelpfulness.bind(this);
    this.handleAnswerReport = this.handleAnswerReport.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showPhotos = this.showPhotos.bind(this);
    this.showPhotosLarge = this.showPhotosLarge.bind(this);
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
      .catch(() => {
        this.setState({
          showNotificationModal: true,
          notificationCode: 'error',
          notificationMessage: 'There was an error in the server, please try later',
        });
      });
  }

  handleCloseModal(modalType) {
    if (modalType === 'notification') {
      this.setState({
        showNotificationModal: false,
        notificationCode: '',
        notificationMessage: '',
      });
    }
    if (modalType === 'image') {
      this.setState({
        showImageModal: false,
      });
    }
  }

  showPhotos() {
    const { answer } = this.props;
    const { photos } = answer;

    if (photos.length > 0) {
      return (
        photos.map((photo) => (
          <ImageThumbnails
            key={photo.id}
            id={photo.id}
            photo={photo}
            showImageModal={this.showPhotosLarge}
          />
        ))
      );
    }
    return null;
  }

  showPhotosLarge(url) {
    this.setState({
      showImageModal: true,
      imageUrl: url,
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
    const { id, answer, collapseAnswers } = this.props;
    const {
      reported,
      showNotificationModal,
      notificationCode,
      notificationMessage,
      showImageModal,
      imageUrl,
    } = this.state;
    const {
      body,
      answerer_name,
      date,
      helpfulness,
    } = answer;
    return (
      <div className={`qa-answer-box ${collapseAnswers ? 'no-display' : ''}`}>
        <div className="qa-answer-letter">
          <span><b>A:</b></span>
        </div>
        <div className="qa-answer-body">
          <span>
            { ` ${body}`}
          </span>
        </div>
        {this.showPhotos()}
        <div className="qa-answer-options">
          <div className="qa-answer-format">
            <span>
              { `by ${answerer_name}, `}
            </span>
            <span>
              { moment(date).format('LL')}
            </span>
          </div>
          <div className="qa-answer-format">
            <span>
              {'Helpful? '}
              <u
                className="qa-answer-helpfulness pointer"
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
          <div className="qa-answer-format qa-reset-format">
            <span>
              <u
                className="qa-answer-report pointer"
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
          showModal={showImageModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={() => {}}
          modalType="image"
          modalCode=""
        >
          <img
            className="qa-image-large pointer"
            src={imageUrl}
            alt="thumbnails"
          />
        </Modal>
      </div>
    );
  }
};

Answers.propTypes = {
  id: PropTypes.number.isRequired,
  AnswerHelpfulness: PropTypes.func.isRequired,
  collapseAnswers: PropTypes.bool.isRequired,
  answer: PropTypes.shape({
    body: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default Answers;
