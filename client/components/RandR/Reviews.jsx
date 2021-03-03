import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import IndReview from './IndReview';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: props.reviews.results,
      displayCount: 2,
      display: props.reviews.results.slice(0, 2),
      sort: props.sort,
      ratingTotal: props.ratings,
    };
  }

  renderTwo() {
    const { reviews } = this.state;
    let { displayCount } = this.state;
    this.setState({
      displayCount: displayCount += 2,
      display: reviews.slice(0, displayCount),
    });
  }

  render() {
    const { reviews, displayCount, ratingTotal } = this.state;
    let { display, sort } = this.state;
    const renderTwo = this.renderTwo.bind(this);
    display = display ? display.map((review) => (
      <IndReview review={review} />
    )) : null;

    return (
      <div>
        <div>{ratingTotal} reviews, sorted by {sort} </div>
        <div className="reviewList">{display}</div>
        {reviews.length - displayCount > 0 ? <button type="button" onClick={renderTwo}>MORE REVIEWS</button> : null}
        <button type="button">ADD A REVIEW   +</button>
      </div>
    );
  }
}
// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };
//
export default Reviews;
