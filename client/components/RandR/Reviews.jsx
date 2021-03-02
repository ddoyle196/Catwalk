import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews.results,
      displayCount: 2,
      display: props.reviews.results.slice(0, 2),
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
    const { reviews, displayCount } = this.state;
    let { display } = this.state;
    const renderTwo = this.renderTwo.bind(this);
    display = display ? display.map((review) => (
      <h3>
        {review.summary}
      </h3>
    )) : null;
    return (
      <div>
        <div> Reviews </div>
        <div id="reviewList">{display}</div>
        {reviews.length - displayCount > 0 ? <button type="button" onClick={renderTwo}>More Reviews</button> : null}
      </div>
    );
  }
}
// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };

export default Reviews;
