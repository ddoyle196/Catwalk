/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ ratings }) => {
  let ratingTotal = 0;
  let voteCount = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in ratings) {
    ratingTotal += Number(key) * Number(ratings[key]);
    voteCount += Number(ratings[key]);
  }
  const starRating = Math.round((ratingTotal / voteCount) * 2) / 2;

  return (
    <div>
      STAR RATING:
      {starRating}
    </div>
  );
};

StarRating.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ratings: PropTypes.object.isRequired,
};

export default StarRating;
