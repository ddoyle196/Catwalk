import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';
import Q0Star from '@iconify-icons/fluent/star-20-regular';
import Q4Star from '@iconify-icons/fluent/star-20-filled';
import Modal from '../shared/Modal';

import IndReview from './IndReview';

const handleEmailValidation = (email) => {
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!email.match(mailformat);
};

const handleUrlValidation = (str) => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return !!regexp.test(str);
};

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 2,
      options: ['relevant', 'newest', 'helpful'],
      stars: ['', '', '', '', ''],
      optionSelect: props.sort,
      query: '',
      showReviewModal: false,
      showNotificationModal: false,
      notificationCode: '',
      notificationMessage: '',
      reviewWithPhoto: false,
      photos: {
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
      },
      characteristics: {
        characteristicsize: '',
        characteristicwidth: '',
        characteristiccomfort: '',
        characteristicquality: '',
        characteristiclength: '',
        characteristicfit: '',
      },
      newReview: {
        rating: '',
        recommend: '',
        summary: '',
        body: '',
        name: '',
        email: '',
      },
      validateReviewInput: {
        rating: true,
        recommend: true,
        characteristics: true,
        summary: true,
        body: true,
        photo: true,
        name: true,
        email: true,
      },
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showValidationErrors = this.showValidationErrors.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.updateNewRating = this.updateNewRating.bind(this);
  }

  handleNewQuery() {
    const { query } = this.state;
    this.setState({
      newQuery: query,
    });
  }

  handleCloseModal(modalType) {
    if (modalType === 'submit-rr') {
      this.setState({
        showReviewModal: false,
        validateReviewInput: {
          rating: true,
          recommend: true,
          characteristics: true,
          summary: true,
          body: true,
          photo: true,
          name: true,
          email: true,
        },
        reviewWithPhoto: false,
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
    const { newReview, photos, characteristics } = this.state;
    const inputNewReview = { ...newReview };
    const inputNewPhoto = { ...photos };
    const inputNewChar = { ...characteristics };
    if (name.includes('photo')) {
      inputNewPhoto[name] = e.target.value;
    } else if (name.includes('characteristic')) {
      inputNewChar[name] = e.target.value;
    } else {
      inputNewReview[name] = e.target.value;
    }
    this.setState({
      newReview: inputNewReview,
      photos: inputNewPhoto,
      characteristics: inputNewChar,
    });
  }

  handlePhotoSubmit() {
    this.setState({
      reviewWithPhoto: true,
    });
  }

  updateOptionSelect(selected) {
    this.setState({ optionSelect: selected });
  }

  displayOptions() {
    const { updateSort } = this.props;
    const { options, optionSelect } = this.state;
    return (
      <select
        value={optionSelect}
        onChange={(e) => {
          this.updateOptionSelect(e.target.value);
          updateSort(e.target.value);
        }}
        className="rr-drop"
      >
        {
          options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option === 'helpful' ? 'helpfulness' : option === 'relevant' ? 'relevance' : 'newest'}
            </option>
          ))
        }
      </select>
    );
  }

  handleSubmitReview() {
    const {
      newReview, photos, reviewWithPhoto, characteristics,
    } = this.state;
    const { product_id } = this.props;
    const photoArray = Object.values(photos).filter((photo) => photo !== '');
    const validatePhotos = photoArray.map((photo) => handleUrlValidation(photo));
    const validateReview = {
      rating: newReview.rating >= 1 && newReview.rating <= 5 && newReview.rating % 1 === 0 && newReview.rating !== '',
      recommend: newReview.recommend === 'true' || newReview.recommend === 'false',
      characteristics: Object.values(characteristics).every((trait) => parseInt(trait) >= 1 && parseInt(trait) <= 5 && parseInt(trait) % 1 === 0 && trait !== ''),
      summary: newReview.summary.length > 3 || newReview.summary.length === 0,
      body: newReview.body.length >= 50,
      name: newReview.name.length > 3,
      email: newReview.email.length > 3 && handleEmailValidation(newReview.email),
    };
    if (
      validateReview.rating
      && validateReview.recommend
      && validateReview.characteristics
      && validateReview.summary
      && validateReview.body
      && validateReview.name
      && validateReview.email
      && (
        (reviewWithPhoto && !validatePhotos.includes(false))
        || (!reviewWithPhoto)
      )
    ) {
      const newPhotoReview = {
        ...newReview, characteristics, product_id, photos: photoArray,
      };
      axios.post('/reviews', newPhotoReview)
        .then((result) => {
          if (result.status === 201) {
            this.setState({
              showReviewModal: false,
              showNotificationModal: true,
              notificationCode: 'success',
              notificationMessage: 'Review Submited Successfully',
              validateReviewInput: {
                rating: true,
                recommend: true,
                characteristics: true,
                summary: true,
                body: true,
                photo: true,
                name: true,
                email: true,
              },
              reviewWithPhoto: false,
            });
          }
        });
    } else {
      validateReview.photo = !validatePhotos.includes(false);
      this.setState({
        validateReviewInput: validateReview,
      });
    }
  }

  showReviewModal() {
    this.setState({
      showReviewModal: true,
    });
  }

  updateQuery(e) {
    const { target } = e;
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  updateNewRating(e) {
    console.log(e);
    const { target } = e;
    const { parentNode } = target;
    const { value } = parentNode;
    const { newReview } = this.state;
    const temp = { ...newReview };
    temp.rating = value;
    this.setState({
      newReview: temp,
    });
  }

  renderTwo() {
    this.setState({
      displayCount: this.state.displayCount += 2,
    });
  }

  showValidationErrors(input) {
    const { validateReviewInput } = this.state;
    if (!validateReviewInput[input]) {
      if (input === 'email') {
        return (
          <div>
            <span
              className="rr-modal-error-message"
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
              className="rr-modal-error-message"
            >
              {`One or many ${input}'s url are invalid, check again and submit`}
            </span>
          </div>
        );
      }
      if (input === 'body') {
        return (
          <div>
            <span
              className="rr-modal-error-message"
            >
              {`Please enter a ${input} with at least 50 characters`}
            </span>
          </div>
        );
      }
      if (input === 'recommend') {
        return (
          <div>
            <span
              className="rr-modal-error-message"
            >
              Please select if you would recommend this product
            </span>
          </div>
        );
      }
      if (input === 'rating') {
        return (
          <div>
            <span
              className="rr-modal-error-message"
            >
              {`Please select a ${input} for this product`}
            </span>
          </div>
        );
      }
      if (input === 'characteristics') {
        return (
          <div>
            <span
              className="rr-modal-error-message"
            >
              {`Please select a rating for each ${input} for this product`}
            </span>
          </div>
        );
      }
      return (
        <div>
          <span
            className="rr-modal-error-message"
          >
            {`Please enter a ${input === 'summary' ? 'summary' : 'nickname'} with more than 3 letters`}
          </span>
        </div>
      );
    }
    return null;
  }

  render() {
    const { displayCount, query, stars } = this.state;
    const { ratingFilter, sort, pName } = this.props;
    const { reviews } = this.props;
    const { results } = reviews;
    const renderTwo = this.renderTwo.bind(this);
    const displayOptions = this.displayOptions.bind(this);

    const starOptions = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

    const sizeOptions = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
    const widthOptions = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
    const comfortOptions = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
    const qualityOptions = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
    const lengthOptions = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
    const fitOptions = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];

    const {
      showReviewModal,
      validateReviewInput,
      showNotificationModal,
      notificationCode,
      notificationMessage,
      reviewWithPhoto,
    } = this.state;

    const {
      rating,
      characteristics,
      recommend,
      name,
      summary,
      body,
      email,
      photo,
    } = validateReviewInput;

    let preSort = results;
    // reviews are already sorted if sorted by new or helpful
    if (sort === 'relevant') {
      preSort = results.sort((a, b) => {
        const moreHelp = a.helpfulness > b.helpfulness ? a.helpfulness : b.helpfulness;
        const parsedAD = Date.parse(a.date);
        const parsedBD = Date.parse(b.date);
        const moreRecent = parsedAD > parsedBD ? parsedAD : parsedBD;
        const aRel = ((a.helpfulness / moreHelp) * 2 + (parsedAD / moreRecent));
        const bRel = ((b.helpfulness / moreHelp) * 2 + (parsedBD / moreRecent));
        return aRel - bRel;
      });
    }
    // filter here based on parent filter fed in from histogram selections
    const display = preSort.filter((review) => {
      let check = false;
      if (ratingFilter.indexOf(true) === -1) {
        return true;
      }
      for (let i = 0; i < ratingFilter.length; i += 1) {
        if (ratingFilter[i] === true && review.rating === i + 1) {
          check = true;
        }
      }
      return check;
    });
    let refined = [];
    // filter based on search query, if any
    if (query !== '' && query.length >= 3) {
      refined = display.filter((review) => {
        let check = false;
        if (review.summary.indexOf(query) !== -1 || review.body.indexOf(query) !== -1) {
          check = true;
        }
        return check;
      });
    } else {
      refined = display;
    }

    // cut down to two original
    const trimmedDisplay = refined.slice(0, displayCount);
    // create reviews html
    const finalDisplay = trimmedDisplay.map((review) => (
      <IndReview review={review} key={review.review_id} />
    ));

    return (
      <div>
        <div className="rr-review-input">
          <div className="rr-search-icon">
            <Icon icon={magnifyIcon} />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Search product reviews..."
            className="rr-input"
            onChange={(e) => { this.updateQuery(e); }}
          />
        </div>
        <div>
          {refined.length}
          {' '}
          reviews, sorted by
          {' '}
          {displayOptions()}
          {' '}
        </div>
        <div className="reviewList" id="reviewScroll">{finalDisplay}</div>
        { refined.length - displayCount > 0 ? <button type="button" onClick={renderTwo} className="rr-button">MORE REVIEWS</button> : null}
        <button
          type="button"
          className="rr-button"
          onClick={() => this.showReviewModal()}
          onKeyDown={this.handleButtonClick}
          tabIndex={0}
        >
          SUBMIT A REVIEW +
        </button>
        <Modal
          showModal={showNotificationModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={() => { }}
          modalType="notification"
          modalCode={notificationCode}
        >
          <span
            className="modal-text"
          >
            {notificationMessage}
          </span>
        </Modal>
        <Modal
          showModal={showReviewModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={this.handleSubmitReview}
          modalType="submit-rr"
          modalCode=""
        >
          <div className="rr-modal-title">
            <span>Write Your Review</span>
          </div>
          <div className="rr-modal-subtitle">
            <span>
              <div style={{ display: 'inline-block', whiteSpace: 'pre' }}>About the </div>
              <div style={{ display: 'inline-block', textDecoration: 'underline' }}>{pName}</div>
            </span>
          </div>
          <div className="rr-modal-form">
            <div className={`rr-modal-rating ${rating ? '' : 'rr-modal-input-error'}`}>
              <span
                className="rr-modal-input-titles"
              >
                Overall, how would you rate this product? *
              </span>
              <br />
              <div className="rr-star-holder">
                {stars.map((star, index) => {
                  const { newReview: inter } = this.state;
                  const { rating: newRating } = inter;
                  const indexCheck = index + 1;
                  return (
                    <button
                      type="submit"
                      className="rr-star-button pointer"
                      value={indexCheck}
                      onClick={(e) => { this.updateNewRating(e); }}
                    >
                      {indexCheck <= newRating ? (
                        <Icon
                          icon={Q4Star}
                          value={indexCheck}
                        />
                      )
                        : (
                          <Icon
                            icon={Q0Star}
                            value={indexCheck}
                          />
                        )}
                    </button>
                  );
                })}
              </div>
              <div className="rr-star-holder">{starOptions[this.state.newReview.rating - 1]}</div>
              {this.showValidationErrors('rating')}
            </div>
            <div className={`rr-modal-recommend ${recommend ? '' : 'rr-modal-input-error'}`}>
              <span
                className="rr-modal-input-titles"
              >
                Would you recommend this product? *
              </span>
              <br />
              <label htmlFor="yes" className="rr-choice ">
                <input type="radio" id="yes" name="recommend" value="true" onChange={this.handleInputChange} />
                Yes
              </label>
              <label htmlFor="no" className="rr-choice ">
                <input type="radio" id="no" name="recommend" value="false" onChange={this.handleInputChange} />
                No
              </label>
              <br />
              {this.showValidationErrors('recommend')}
            </div>
            <div className={`rr-modal-characteristics ${characteristics ? '' : 'rr-modal-input-error'}`}>
              <div>
                <span
                  className="rr-modal-input-titles"
                >
                  Please rate the product based on the following factors: *
                </span>
                <br />
              </div>
              <div>
                <div>
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Size:
                    {' '}
                  </span>
                  {sizeOptions[this.state.characteristics.characteristicsize - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristicsize" className="rr-choice ">
                      <input type="radio" id="cs1" name="characteristicsize" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristicsize" className="rr-choice">
                      <input type="radio" id="cs2" name="characteristicsize" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristicsize" className="rr-choice">
                      <input type="radio" id="cs3" name="characteristicsize" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristicsize" className="rr-choice">
                      <input type="radio" id="cs4" name="characteristicsize" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristicsize" className="rr-choice">
                      <input type="radio" id="cs5" name="characteristicsize" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
                <div>
                  <br />
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Width:
                    {' '}
                  </span>
                  {widthOptions[this.state.characteristics.characteristicwidth - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristicwidth" className="rr-choice ">
                      <input type="radio" id="cw1" name="characteristicwidth" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristicwidth" className="rr-choice">
                      <input type="radio" id="cw2" name="characteristicwidth" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristicwidth" className="rr-choice">
                      <input type="radio" id="cw3" name="characteristicwidth" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristicwidth" className="rr-choice">
                      <input type="radio" id="cw4" name="characteristicwidth" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristicwidth" className="rr-choice">
                      <input type="radio" id="cw5" name="characteristicwidth" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
                <div>
                  <br />
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Comfort:
                    {' '}
                  </span>
                  {comfortOptions[this.state.characteristics.characteristiccomfort - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristiccomfort" className="rr-choice ">
                      <input type="radio" id="cc1" name="characteristiccomfort" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristiccomfort" className="rr-choice">
                      <input type="radio" id="cc2" name="characteristiccomfort" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristiccomfort" className="rr-choice">
                      <input type="radio" id="cc3" name="characteristiccomfort" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristiccomfort" className="rr-choice">
                      <input type="radio" id="cc4" name="characteristiccomfort" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristiccomfort" className="rr-choice">
                      <input type="radio" id="cc5" name="characteristiccomfort" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
                <div>
                  <br />
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Quality:
                    {' '}
                  </span>
                  {qualityOptions[this.state.characteristics.characteristicquality - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristicquality" className="rr-choice ">
                      <input type="radio" id="cq1" name="characteristicquality" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristicquality" className="rr-choice">
                      <input type="radio" id="cq2" name="characteristicquality" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristicquality" className="rr-choice">
                      <input type="radio" id="cq3" name="characteristicquality" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristicquality" className="rr-choice">
                      <input type="radio" id="cq4" name="characteristicquality" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristicquality" className="rr-choice">
                      <input type="radio" id="cq5" name="characteristicquality" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
                <div>
                  <br />
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Length:
                    {' '}
                  </span>
                  {lengthOptions[this.state.characteristics.characteristiclength - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristiclength" className="rr-choice ">
                      <input type="radio" id="cl1" name="characteristiclength" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristiclength" className="rr-choice">
                      <input type="radio" id="cl2" name="characteristiclength" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristiclength" className="rr-choice">
                      <input type="radio" id="cl3" name="characteristiclength" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristiclength" className="rr-choice">
                      <input type="radio" id="cl4" name="characteristiclength" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristiclength" className="rr-choice">
                      <input type="radio" id="cl5" name="characteristiclength" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
                <div>
                  <br />
                  <span
                    className="rr-modal-input-titles-sub"
                  >
                    Fit:
                    {' '}
                  </span>
                  {fitOptions[this.state.characteristics.characteristicfit - 1]}
                  <br />
                  <div className="rr-radio-group">
                    <label htmlFor="characteristicfit" className="rr-choice ">
                      <input type="radio" id="cf1" name="characteristicfit" value="1" onChange={this.handleInputChange} />
                      1
                    </label>
                    <label htmlFor="characteristicfit" className="rr-choice">
                      <input type="radio" id="cf2" name="characteristicfit" value="2" onChange={this.handleInputChange} />
                      2
                    </label>
                    <label htmlFor="characteristicfit" className="rr-choice">
                      <input type="radio" id="cf3" name="characteristicfit" value="3" onChange={this.handleInputChange} />
                      3
                    </label>
                    <label htmlFor="characteristicfit" className="rr-choice">
                      <input type="radio" id="cf4" name="characteristicfit" value="4" onChange={this.handleInputChange} />
                      4
                    </label>
                    <label htmlFor="characteristicfit" className="rr-choice">
                      <input type="radio" id="cf5" name="characteristicfit" value="5" onChange={this.handleInputChange} />
                      5
                    </label>
                  </div>
                </div>
              </div>
              {this.showValidationErrors('characteristics')}
            </div>
          </div>
          <div className="rr-modal-form">
            <div className="rr-modal-summary">
              <span
                className="rr-modal-input-titles"
              >
                Review Summary:
              </span>
              <input
                type="text"
                name="summary"
                placeholder="Example: Best purchase ever!"
                className={`rr-modal-input ${summary ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="60"
              />
              {this.showValidationErrors('summary')}
            </div>
            <div className="rr-modal-body">
              <span
                className="rr-modal-input-titles"
              >
                Review body: *
              </span>
              <textarea
                type="text"
                name="body"
                placeholder="Why did you like the product or not?"
                className={`rr-modal-input ${body ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                cols="40"
                rows="4"
                maxLength="1000"
              />
              {50 - this.state.newReview.body.length > 0 ? `Minimum required characters left: ${50 - this.state.newReview.body.length}` : 'Minimum reached'}
              {this.showValidationErrors('body')}
            </div>
            <button
              type="submit"
              className={`rr-button ${!reviewWithPhoto ? '' : 'no-display'} pointer`}
              onClick={this.handlePhotoSubmit}
              onKeyDown={this.handleButtonClick}
              tabIndex={0}
            >
              Add Photos
            </button>
            <div className={`rr-modal-photo ${reviewWithPhoto ? '' : 'no-display'}`}>
              <span
                className="rr-modal-input-titles"
              >
                Upload your photos:
              </span>
              {this.showValidationErrors('photo')}
              <input
                type="url"
                name="photo1"
                placeholder="Photo URL here... "
                className={`rr-modal-input ${photo ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo2"
                placeholder="Photo URL here... "
                className={`rr-modal-input ${photo ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo3"
                placeholder="Photo URL here... "
                className={`rr-modal-input ${photo ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo4"
                placeholder="Photo URL here... "
                className={`rr-modal-input ${photo ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
              <input
                type="url"
                name="photo5"
                placeholder="Photo URL here... "
                className={`rr-modal-input ${photo ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="300"
              />
            </div>
            <div className="rr-modal-name">
              <span
                className="rr-modal-input-titles"
              >
                What is your nickname: *
              </span>
              <input
                type="text"
                name="name"
                placeholder="Example: jackson11!"
                className={`rr-modal-input ${name ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="60"
              />
              {this.showValidationErrors('name')}
              <span
                className="rr-modal-little-messages"
              >
                For privacy reasons, do not use your full name or email address.
              </span>
            </div>
            <div className="rr-modal-email">
              <span
                className="rr-modal-input-titles"
              >
                Your email: *
              </span>
              <input
                type="text"
                name="email"
                placeholder="Example: jack@email.com"
                className={`rr-modal-input ${email ? '' : 'rr-modal-input-error'}`}
                onChange={this.handleInputChange}
                maxLength="60"
              />
              {this.showValidationErrors('email')}
              <span
                className="rr-modal-little-messages"
              >
                For authentication reasons, you will not be emailed.
              </span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };
//
export default Reviews;
