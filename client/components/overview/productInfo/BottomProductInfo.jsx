import React from 'react';
import { InlineIcon } from '@iconify/react';
import check from '@iconify-icons/mdi/check';
import facebookIcon from '@iconify-icons/mdi/facebook';
import twitterIcon from '@iconify-icons/mdi/twitter';
import pinterestIcon from '@iconify-icons/mdi/pinterest';

import PropTypes from 'prop-types';

const BottomProductInfo = ({ product }) => {
  let keyCount = 0;
  const features = product.features.map((item) => {
    keyCount += 1;
    return (
      <p key={keyCount} className="feature-text-container">
        <span className="feature-check-icon"><InlineIcon key={keyCount} icon={check} width="1.5em" height="1.5em" /></span>
        <span className="feature-text">{item.feature}</span>
      </p>
    );
  });
  return (
    <div className="bottom-product-info-container">
      <div className="bottom-product-info-left-container">
        {product.slogan && <p className="slogan"><strong>{product.slogan}</strong></p>}
        {product.description && <p className="description">{product.description}</p>}
      </div>
      <div className="bottom-product-info-right-container">
        {features}
        <div className="social-media-icon-container">
          <span className="social-media-icon"><InlineIcon icon={facebookIcon} /></span>
          <span className="social-media-icon"><InlineIcon icon={twitterIcon} /></span>
          <span className="social-media-icon"><InlineIcon icon={pinterestIcon} /></span>
        </div>
      </div>
    </div>
  );
};

BottomProductInfo.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default BottomProductInfo;
