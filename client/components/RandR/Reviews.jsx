import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import IndReview from './IndReview';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 2,
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
        className="rr-drop"
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
    this.setState({
      displayCount: this.state.displayCount += 2,
    });
  }

  render() {
    const { displayCount, ratingTotal } = this.state;
    const { ratingFilter } = this.props;
    const { results } = this.props.reviews;
    const renderTwo = this.renderTwo.bind(this);
    const displayOptions = this.displayOptions.bind(this);

    // reviews are already sorted
    // filter here based on parent filter fed in from histogram selections
    const display = results.filter((review) => {
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
    // cut down to two original
    const trimmedDisplay = display.slice(0, displayCount);
    // create reviews html
    const finalDisplay = trimmedDisplay.map((review) => (
      <IndReview review={review} />
    ));

    return (
      <div>
        <div>
          {display.length}
          {' '}
          reviews, sorted by
          {' '}
          {displayOptions()}
          {' '}
        </div>
        <div className="reviewList">{finalDisplay}</div>
        { display.length - displayCount > 0 ? <button type="button" onClick={renderTwo}>MORE REVIEWS</button> : null}
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
