import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../overview/productInfo/StarRating';
import { Charts, TotalRating } from './BarCharts';

class Histograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headObj: props.ratings,
      ratings: props.ratings.ratings,
    };
  }

  render() {
    const { ratings, headObj } = this.state;
    const { updateRF, ratingFilter, clearRatingFilter } = this.props;
    if (ratings) {
      return (
        <div className="ratingSummary" key={`summary${Date.now()}`}>
          <h2 className="ratingLarge" key="ratingLarge">{TotalRating(ratings)}</h2>
          <div className="histoStars" key="histoStars"><StarRating ratings={ratings} key="stars" /></div>
          <div className="barCharts" key="barCharts">{Charts(headObj, updateRF, ratingFilter, clearRatingFilter)}</div>
        </div>
      );
    }
    return null;
  }
}

// Histograms.propTypes = {
//   ratings: PropTypes.shape({ ratings: PropTypes.shape }).isRequired,
// };

export default Histograms;
