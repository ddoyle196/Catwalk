import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const SideProductInfo = ({ product, ratings }) => (
  <div>
    <StarRating ratings={ratings} />
    <h2>SIDE PRODUCT INFO COMPONENT</h2>
    {product.category && <p>{product.category}</p>}
    {product.name && <p>{product.name}</p>}
    {product.default_price && <p>{product.default_price}</p>}
  </div>
);

SideProductInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ratings: PropTypes.object.isRequired,
};

export default SideProductInfo;
