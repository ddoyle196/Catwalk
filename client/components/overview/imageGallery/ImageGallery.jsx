import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowRight from '@iconify-icons/mdi/arrow-right';
import arrowLeft from '@iconify-icons/mdi/arrow-left';
import chevronUp from '@iconify-icons/mdi/chevron-up';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const ImageGallery = ({
  styles,
  selectedStyle,
  selectedImageId,
  updateSelectedImageId,
}) => {
  const photos = [];
  for (let i = 0; i < styles.length; i += 1) {
    const style = styles[i];
    photos.push({
      id: style.style_id,
      thumbnail: style.photos[0].thumbnail_url,
      image: style.photos[0].url,
    });
  }
  let previousImageId = '';
  let selectedImageUrl = '';
  let nextImageId = '';

  if (selectedImageId !== null) {
    for (let i = 0; i < photos.length; i += 1) {
      const currentPhoto = photos[i];
      if (selectedImageId === currentPhoto.id) {
        selectedImageUrl = currentPhoto.image;
        if (i > 0) {
          const previousPhoto = photos[i - 1];
          previousImageId = previousPhoto.id;
        }
        if (i < photos.length - 1) {
          const nextPhoto = photos[i + 1];
          nextImageId = nextPhoto.id;
        }
        break;
      }
    }
  } else {
    for (let i = 0; i < photos.length; i += 1) {
      const currentPhoto = photos[i];
      if (selectedStyle.style_id === currentPhoto.id) {
        selectedImageUrl = currentPhoto.image;
        if (i > 0) {
          const previousPhoto = photos[i - 1];
          previousImageId = previousPhoto.id;
        }
        if (i < photos.length - 1) {
          const nextPhoto = photos[i + 1];
          nextImageId = nextPhoto.id;
        }
        break;
      }
    }
  }

  const thumbnails = [];

  photos.forEach((photo) => {
    thumbnails.push(
      <img className="thumbnail" src={photo.thumbnail} alt="" />,
    );
  });

  return (
    <div className="image-gallery-container">
      <img className="image-gallery-large-image" src={selectedImageUrl} alt="" />
      <div className="thumbnail-container">
        <span className="image-gallery-chevron-up"><Icon icon={chevronUp} /></span>
        {thumbnails}
        <span className="image-gallery-chevron-down"><Icon icon={chevronDown} /></span>
      </div>
      {previousImageId !== '' && (
        <span
          className="image-gallery-left-arrow"
          onClick={() => updateSelectedImageId(previousImageId)}
          onKeyDown={() => updateSelectedImageId(previousImageId)}
          tabIndex="0"
          aria-label="previous image"
          role="button"
        >
          <Icon icon={arrowLeft} />
        </span>
      )}
      {nextImageId !== '' && (
        <span
          className="image-gallery-right-arrow"
          onClick={() => updateSelectedImageId(nextImageId)}
          onKeyDown={() => updateSelectedImageId(nextImageId)}
          tabIndex="0"
          aria-label="next image"
          role="button"
        >
          <Icon icon={arrowRight} />
        </span>
      )}
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
  updateSelectedImageId: PropTypes.func.isRequired,
  selectedImageId: PropTypes.number,
};

ImageGallery.defaultProps = {
  selectedImageId: null,
};

export default ImageGallery;
