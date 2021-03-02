import React from 'react';
import PropTypes from 'prop-types';

const Histograms = ({ ratings }) => {
  if (ratings) {
    return (
      <div>
        <div className="headerBlock">RATINGS & REVIEWS</div>
        <div> Rating, stars, bars and scales. </div>
        <div>{ratings.ratings[2]}</div>
      </div>
    );
  }
  return null;
};

// Histograms.propTypes = {
//   ratings: PropTypes.shape({ ratings: PropTypes.shape }).isRequired,
// };

export default Histograms;
