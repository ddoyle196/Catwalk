/* eslint-disable no-restricted-syntax */
import React from 'react';
import { InlineIcon } from '@iconify/react';

import Q0Star from '@iconify-icons/fluent/star-20-regular';

import Q1Star from '@iconify-icons/fluent/star-one-quarter-20-filled';

import Q2Star from '@iconify-icons/fluent/star-half-20-filled';

import Q3Star from '@iconify-icons/fluent/star-three-quarter-20-filled';

import Q4Star from '@iconify-icons/fluent/star-20-filled';

import PropTypes from 'prop-types';

const StarRating = ({ ratings, key }) => {
  let ratingTotal = 0;
  let voteCount = 0;
  let stars = [];
  // eslint-disable-next-line guard-for-in
  for (const key in ratings) {
    ratingTotal += Number(key) * Number(ratings[key]);
    voteCount += Number(ratings[key]);
  }
  let blackStars = (Math.round((ratingTotal / voteCount) * 4) / 4).toFixed(2);
  let whiteStars = (5 - blackStars);

  while (blackStars > 0.00) {
    if (blackStars >= 1.00) {
      stars.push(<InlineIcon key={blackStars} icon={Q4Star} />);
      blackStars -= 1.00;
    } else if (blackStars >= 0.75) {
      stars.push(<InlineIcon key={blackStars} icon={Q3Star} />);
      blackStars -= 0.75;
    } else if (blackStars >= 0.50) {
      stars.push(<InlineIcon key={blackStars} icon={Q2Star} />);
      blackStars -= 0.50;
    } else if (blackStars >= 0.25) {
      stars.push(<InlineIcon key={blackStars} icon={Q1Star} />);
      blackStars -= 0.25;
    }
  }
  while (whiteStars >= 1) {
    stars.push(<InlineIcon key={whiteStars - 1} icon={Q0Star} />);
    whiteStars -= 1.00;
  }

  return (
    <div key={key}>
      {stars}
      {/*<span>  LINK: Read all reviews</span>*/}
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
