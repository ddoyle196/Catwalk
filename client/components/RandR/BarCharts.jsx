/* eslint-disable no-restricted-syntax */
import React from 'react';
import { InlineIcon } from '@iconify/react';

import PropTypes from 'prop-types';

export const Charts = ({ ratings }) => {
  let ratingTotal = 0;
  let voteCount = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in ratings) {
    ratingTotal += Number(key) * Number(ratings[key]);
    voteCount += Number(ratings[key]);
  }
  let blackStars = (Math.round((ratingTotal / voteCount) * 4) / 4).toFixed(2);
  let whiteStars = (5 - blackStars);
  const stars = [];

  return (
    <div>
      {stars}
    </div>
  );
};

export const TotalRating = (ratings) => {
  let ratingTotal = 0;
  let voteCount = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in ratings) {
    ratingTotal += Number(key) * Number(ratings[key]);
    voteCount += Number(ratings[key]);
  }
  const ratingVal = (Math.round((ratingTotal / voteCount) * 4) / 4).toFixed(2);
  return ratingVal;
};
