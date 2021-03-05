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
    let { results } = this.props.reviews;
    let display = results.slice(0, displayCount);
    const renderTwo = this.renderTwo.bind(this);
    const displayOptions = this.displayOptions.bind(this);
    display = display.map((review) => (
      <IndReview review={review} />
    ));

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
        {results.length - displayCount > 0 ? <button type="button" onClick={renderTwo}>MORE REVIEWS</button> : null}
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
