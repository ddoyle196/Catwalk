/* eslint-disable no-restricted-syntax */
import React from 'react';
import { InlineIcon } from '@iconify/react';
import blackStar from '@iconify-icons/mdi/star';
import whiteStar from '@iconify-icons/mdi/star-outline';
import halfStar from '@iconify-icons/mdi/star-half-full';

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
  const stars = [];
  while (blackStars > 0.5) {
    stars.push(<InlineIcon key={blackStars} icon={blackStar} />);
    blackStars -= 1;
  }

  if (blackStars > 0) {
    stars.push(<InlineIcon key={blackStars} icon={halfStar} />);
  }

  while (whiteStars > 0) {
    stars.push(<InlineIcon key={whiteStars - 1} icon={whiteStar} />);
    whiteStars -= 1;
  }

  return (
    <div>
      {stars}
      <span>  LINK: Read all reviews</span>
    </div>
  );
};

StarRating.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }).isRequired,
};

export default StarRating;
