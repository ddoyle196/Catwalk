import React from 'react';
import PropTypes from 'prop-types';

const BottomProductInfo = ({ product }) => (
  <div>
    <h2>BOTTOM PRODUCT INFO COMPONENT</h2>
    {product.slogan && <p>{product.slogan}</p>}
    {product.description && <p>{product.description}</p>}
    <div>
      <p>{product.features[0].feature}</p>
      <p>{product.features[1].feature}</p>
      <p>{product.features[2].feature}</p>
    </div>
  </div>
);

BottomProductInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
};

export default BottomProductInfo;
