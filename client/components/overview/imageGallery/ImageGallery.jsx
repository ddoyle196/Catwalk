import React from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ styles }) => (
  <div className="image-gallery-container">
    <img className="image-gallery-large-image" src={styles[0].photos[0].url} alt="" />
  </div>
);

ImageGallery.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
