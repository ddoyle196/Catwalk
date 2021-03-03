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
    const { ratings } = this.state;
    const { Fragment } = React;
    if (ratings) {
      return (
        <div className="ratingSummary">
          <h2 className="ratingLarge">{TotalRating(ratings)}</h2>
          <div className="histoStars"><StarRating ratings={ratings} /></div>
          {/* <div className="barCharts"><BarCharts ratings={ratings} /></div> */}
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
