import React from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ styles }) => (
  <div>
    <h2>IMAGE GALLERY COMPONENT</h2>
    <img src={styles[0].photos[0].url} alt="" />
  </div>
);

ImageGallery.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
