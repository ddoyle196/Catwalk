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
  product: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }).isRequired,
};

export default SideProductInfo;
