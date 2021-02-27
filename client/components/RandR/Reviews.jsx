import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => (
  <div>
    <div> Reviews </div>
    <div>
      {reviews.map((review) => (
        <h3>
          {review.summary}
        </h3>
      ))}
    </div>
  </div>
);

// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };

export default Reviews;
