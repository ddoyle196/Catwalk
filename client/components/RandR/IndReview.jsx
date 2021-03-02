import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

class IndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { Fragment } = React;
    let { review } = this.props;
    console.log(review);
    return (
      <Fragment>
        <div>{review.rating}</div>

        <div>
          {review.reviewer_name}
          ' '
          {moment(review.date).format('LL')}
        </div>

        <div className="summary">{review.summary.slice(0, 60)}{review.summary.length > 60 ? '...' : null}</div>

        <div>
          {review.summary.length > 60 ? review.summary.slice(60) : null}
          {review.body}
        </div>
        <div>Helpful? {review.helpfulness}</div>
        <div>{review.recommend}</div>

        <div>{review.response}</div>
        {/* <div>{review.photos}</div> */}
      </Fragment>
    );
  }
}

// // Reviews.propTypes = {
// //   reviews: PropTypes.array.isRequired,
// // };

export default IndReview;
