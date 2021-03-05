import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

import { Icon } from '@iconify/react';
import checkCircleOutline from '@iconify-icons/mdi/check-circle-outline';
import StarRating from '../overview/productInfo/StarRating';

import Modal from '../shared/Modal';
import ImageThumbnails from '../QuestionsAnswers/ImageThumbnails';

class IndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyDisplay: props.review.body.slice(0, 249),
      fullDisplay: !(props.review.body.length > 250),
      reported: false,
      helpfulness: false,
      showNotificationModal: false,
      notificationCode: '',
      notificationMessage: '',
      showImageModal: false,
      imageUrl: '',
      id: props.review.review_id,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showPhotos = this.showPhotos.bind(this);
    this.showPhotosLarge = this.showPhotosLarge.bind(this);
    this.AddReviewrHelpfulness = this.AddReviewHelpfulness.bind(this);
    this.handleReviewReport = this.handleReviewReport.bind(this);
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

  handleReviewReport(id) {
    axios.put(`/reviews/${id}/report`)
      .then((result) => {
        if (result.status === 204) {
          this.setState({
            reported: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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

  AddReviewHelpfulness() {
    const { id, AnswerHelpfulness } = this.props;
    const { helpfulness } = this.state;
    if (!helpfulness) {
      AnswerHelpfulness(id);
      this.setState({
        helpfulness: true,
      });
    }
  }

  fullBody() {
    const { review } = this.props;
    this.setState(
      {
        bodyDisplay: review.body,
        fullDisplay: true,
      },
    );
  }

  showPhotos() {
    const { review } = this.props;

    if (review.photos.length > 0) {
      return (
        review.photos.map((photo) => (
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

  render() {
    const { Fragment } = React;
    const { review } = this.props;

    const {
      bodyDisplay,
      fullDisplay,
      reported,
      helpfulness,
      showNotificationModal,
      notificationCode,
      notificationMessage,
      showImageModal,
      imageUrl,
      id,
    } = this.state;

    const fullBody = this.fullBody.bind(this);
    const showPhotos = this.showPhotos.bind(this);

    let cleanSummary = review.summary.slice(0, 60);
    cleanSummary = review.summary.length > 60 ? cleanSummary.concat('...') : cleanSummary;

    const summarySpill = review.summary.length > 60 ? '...'.concat(review.summary.slice(60)) : null;

    const indRating = { [review.rating]: '1' };
    return (
      <div className="revContainer">
        <div className="Rheader">
          <div className="revRating">
            <StarRating ratings={indRating} />
          </div>
          <div className="userDate">
            <Icon icon={checkCircleOutline} />
            {' '}
            {review.reviewer_name}
            {', '}
            {moment(review.date).format('LL')}
          </div>
        </div>

        <div className="summary">
          {cleanSummary}
          {' '}
        </div>

        <div className="rBody">
          {summarySpill}
          {bodyDisplay}
          {!fullDisplay ? (
            <div className="smallLink" onClick={() => { fullBody(); }}>
              Show more
            </div>
          ) : null}
        </div>

        <div className="qa-answer-box">
          {this.showPhotos()}
          <Modal
            showModal={showNotificationModal}
            handleCloseModal={this.handleCloseModal}
            handleSubmit={() => { }}
            modalType="notification"
            modalCode={notificationCode}
          >
            <span className="modal-text">{notificationMessage}</span>
          </Modal>
          <Modal
            showModal={showImageModal}
            handleCloseModal={this.handleCloseModal}
            handleSubmit={() => { }}
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

        <div>
          {review.recommend ? (
            <div className="recommendation">
              <Icon icon={checkCircleOutline} />
              {' '}
              I recommend this product
            </div>
          ) : null}
        </div>

        <div>
          {review.response ? (
            <div className="response">
              <div className="respHead">Response from Seller:</div>
              <div>{review.response}</div>
            </div>
          ) : null}
        </div>
        <div className="rr-review-format">
          <span>
            {'Helpful? '}
            <u
              className="pointer"
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
        <div className="rr-review-format rr-reset-format">
          <span>
            <u
              className="pointer"
              onClick={() => this.handleAnswerReport(id)}
              onKeyDown={this.handleButtonClick}
              role="button"
              tabIndex={0}
            >
              {reported ? 'Reported' : 'Report'}
            </u>
          </span>
        </div>
      </div>
    );
  }
}

// // Reviews.propTypes = {
// //   reviews: PropTypes.array.isRequired,
// // };

export default IndReview;
