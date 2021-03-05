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
      options: ['relevant', 'newest', 'helpful'],
      optionSelect: props.sort,
    };
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
      >
        {
          options.map((option) => (
            <option
              value={option}
            >
              {option}
            </option>
          ))
        }
      </select>
    );
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
    const displayOptions = this.displayOptions.bind(this);
    display = display ? display.map((review) => (
      <IndReview review={review} />
    )) : null;

    return (
      <div>
        <div>
          {ratingTotal}
          {' '}
          reviews, sorted by
          {' '}
          {displayOptions()}
          {' '}
        </div>
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
