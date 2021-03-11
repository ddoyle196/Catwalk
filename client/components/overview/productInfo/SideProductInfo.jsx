import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const SideProductInfo = ({ product, ratings }) => {
  let formattedPrice = '';
  const removeZerosFromPrice = (price) => {
    const slicedEnd = price.slice(-2);
    if (slicedEnd === '00') {
      formattedPrice = product.default_price.slice(0, -3);
    } else {
      formattedPrice = product.default_price;
    }
  };
  removeZerosFromPrice(product.default_price);
  return (
    <div>
      <StarRating ratings={ratings} />
      <span>  LINK: Read all reviews</span>
      {product.category && <p className="product-category">{product.category.toUpperCase()}</p>}
      {product.name && <p className="expanded-product-name">{product.name}</p>}
      {product.default_price && (
        <p>
          $
          {formattedPrice}
        </p>
      )}
    </div>
  );
};

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
