import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';

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
      query: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { target } = e;
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  handleNewQuery() {
    const { query } = this.state;
    this.setState({
      newQuery: query,
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

  renderTwo() {
    this.setState({
      displayCount: this.state.displayCount += 2,
    });
  }

  render() {
    const { displayCount, ratingTotal, query } = this.state;
    const { ratingFilter, sort } = this.props;
    const { results } = this.props.reviews;
    const renderTwo = this.renderTwo.bind(this);
    const displayOptions = this.displayOptions.bind(this);

    let preSort = results;
    // reviews are already sorted if sorted by new or helpful
    if (sort === 'relevant') {
      preSort = results.sort((a, b) => {
        let moreHelp = a.helpfulness > b.helpfulness ? a.helpfulness : b.helpfulness;
        let parsedAD = Date.parse(a.date);
        let parsedBD = Date.parse(b.date);
        let moreRecent = parsedAD > parsedBD ? parsedAD : parsedBD;
        let aRel = ((a.helpfulness / moreHelp) * 2 + (parsedAD / moreRecent));
        let bRel = ((b.helpfulness / moreHelp) * 2 + (parsedBD / moreRecent));
        return aRel - bRel;
      });
    }
    // filter here based on parent filter fed in from histogram selections
    let display = preSort.filter((review) => {
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
    //filter based on search query, if any
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
          <input className=''
            type="text"
            name="name"
            placeholder="Search product reviews..."
            className="rr-input"
            onChange={(e) => { this.handleInputChange(e); }}
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
        <div className="reviewList">{finalDisplay}</div>
        { display.length - displayCount > 0 ? <button type="button" onClick={renderTwo} className="rr-button">MORE REVIEWS</button> : null}
        <button type="button" className="rr-button">ADD A REVIEW   +</button>
      </div>
    );
  }
}
// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };
//
export default Reviews;
