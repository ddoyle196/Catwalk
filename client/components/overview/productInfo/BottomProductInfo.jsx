import React from 'react';
import PropTypes from 'prop-types';

const BottomProductInfo = ({ product }) => (
  <div className="bottom-product-info-container">
    <div className="bottom-product-info-left-container">
      {product.slogan && <p>{product.slogan}</p>}
      {product.description && <p>{product.description}</p>}
    </div>
    <div className="bottom-product-info-right-container">
      <p>{product.features[0].feature}</p>
      <p>{product.features[1].feature}</p>
      <p>{product.features[2].feature}</p>
    </div>
  </div>
);

BottomProductInfo.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default BottomProductInfo;
