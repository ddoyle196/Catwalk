import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkCircleOutline from '@iconify-icons/mdi/check-circle-outline';
import StarRating from '../overview/productInfo/StarRating';
import moment from 'moment';

class IndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyDisplay: props.review.body.slice(0, 249),
      fullDisplay: false,
    };
  }

  fullBody() {
    this.setState(
      {
        bodyDisplay: props.review.body,
        fullDisplay: true
      });
  }

  // handleAnswerReport(id) {
  //   axios.put(`/answers/${id}/report`)
  //     .then((result) => {
  //       if (result.status === 204) {
  //         this.setState({
  //           reported: true,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // AddAnswerHelpfulness() {
  //   const { id, AnswerHelpfulness } = this.props;
  //   const { helpfulness } = this.state;
  //   if (!helpfulness) {
  //     AnswerHelpfulness(id);
  //     this.setState({
  //       helpfulness: true,
  //     });
  //   }
  // }

  render() {
    const { Fragment } = React;
    let { review } = this.props;
    let { bodyDisplay } = this.state;
    console.log(review);
    let cleanSummary = review.summary.slice(0, 60);
    cleanSummary = review.summary.length > 60 ? cleanSummary.concat('...') : cleanSummary;

    let summarySpill = review.summary.length > 60 ? '...'.concat(review.summary.slice(60)) : null;

    let imageArray = review.photos ? review.photos.map((photo) => (
      <IndReview review={review} />
    )) : null;

    const indRating = { [review.rating]: '1' };
    return (
      <Fragment>

        <div className="Rheader">
          <div className="revRating">
            <StarRating ratings={indRating} />
          </div>
          <div className="userDate">
            <Icon icon={checkCircleOutline} />
            {' '}
            {review.reviewer_name}{', '}
            {moment(review.date).format('LL')}
          </div>
        </div>

        <div className="summary">{cleanSummary} </div>

        <div className="rBody">
          {summarySpill}
          {bodyDisplay}
        </div>

        <div>{review.recommend}</div>

        {review.response ? (
          <div className="response">
            <div className="respHead">Response from Seller:</div>
            <div>{review.response}</div>
          </div>
        ) : null}

        {/* <div className="question-format">
          <span>
            {'Helpful? '}
            <u
              className="pointer"
              onClick={() => this.AddReviewHelpfulness()}
              onKeyDown={this.handleButtonClick}
              role="button"
              tabIndex={0}
            >
              Yes
            </u>
            {` (${review.helpfulness})`}
          </span>
        </div>
        <div className="question-format reset">
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
        </div> */}
        <hr />
      </Fragment>
    );
  }
}

// // Reviews.propTypes = {
// //   reviews: PropTypes.array.isRequired,
// // };

export default IndReview;
