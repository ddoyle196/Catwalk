import React from 'react';
import PropTypes from 'prop-types';

const Histograms = ({ ratings }) => (
  <div>
    <div> Rating, stars, bars and scales. </div>
    <div>{ratings.ratings[2]}</div>
  </div>
);

// Histograms.propTypes = {
//   ratings: PropTypes.shape({ ratings: PropTypes.shape }).isRequired,
// };

export default Histograms;
