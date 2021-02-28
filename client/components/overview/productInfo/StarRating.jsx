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
  let blackStars = Math.round((ratingTotal / voteCount) * 2) / 2;
  let whiteStars = Math.floor(5 - blackStars);
  let stars = '';
  while (blackStars > 0.5) {
    stars += String.fromCharCode(9733); // char code for black rating star
    blackStars -= 1;
  }

  if (blackStars > 0) {
    stars += 'HALF STAR'; // TO DO: FIND HALF STAR SYMBOL TO INSERT HERE
    // Unicode: U+2BE8 // HTML (decimal) &#11240; // HTML (hex) &#x2be8;
  }

  while (whiteStars > 0) {
    stars += String.fromCharCode(9734); // char code for white rating star
    whiteStars -= 1;
  }

  return (
    <div>
      {stars}
      <span>TO DO: A LINK THAT SAYS &quot;Read all reviews&quot;</span>
    </div>
  );
};

StarRating.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ratings: PropTypes.object.isRequired,
};

export default StarRating;
