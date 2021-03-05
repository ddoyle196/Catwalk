import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi/arrow-right';
import arrowLeft from '@iconify-icons/mdi/arrow-left';
import chevronUp from '@iconify-icons/mdi/chevron-up';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const ImageGallery = ({ styles, selectedStyle }) => {
  const photos = [];
  for (let i = 0; i < styles.length; i += 1) {
    const style = styles[i];
    photos.push({
      id: style.style_id,
      thumbnail: style.photos[0].thumbnail_url,
      image: style.photos[0].url,
    });
  }
  let selectedImage = '';
  let highlightedThumbnail = '';

  for (let i = 0; i < photos.length; i += 1) {
    const photo = photos[i];
    if (selectedStyle.style_id === photo.id) {
      selectedImage = photo.image;
      highlightedThumbnail = photo.thumbnail;
      break;
    }
  }

  return (
    <div className="image-gallery-container">
      <img className="image-gallery-large-image" src={selectedImage} alt="" />
      <div className="thumbnail-container">
        <span className="image-gallery-chevron-up"><Icon icon={chevronUp} /></span>
        <img className="thumbnail" src={highlightedThumbnail} alt="" />
        <img className="thumbnail" src={highlightedThumbnail} alt="" />
        <img className="thumbnail" src={highlightedThumbnail} alt="" />
        <span className="image-gallery-chevron-down"><Icon icon={chevronDown} /></span>
      </div>
      <span className="image-gallery-left-arrow"><Icon icon={arrowLeft} /></span>
      <span className="image-gallery-right-arrow"><Icon icon={arrowRight} /></span>
    </div>
  );
};

ImageGallery.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/forbid-prop-types
    skus: PropTypes.object,
  }).isRequired,
};

export default ImageGallery;
