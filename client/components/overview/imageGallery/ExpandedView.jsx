import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify-icons/mdi/close';
import arrowLeftBoldOutline from '@iconify-icons/mdi/arrow-left-bold-outline';
import arrowRightBoldOutline from '@iconify-icons/mdi/arrow-right-bold-outline';

const ExpandedView = ({
  selectedImageUrl,
  updateExpandedView,
  nextImageId,
  previousImageId,
  updateSelectedImageId,
  photos,
  magnified,
  updateMagnified,
}) => {
  const thumbnailIcons = [];
  photos.forEach((photo) => {
    thumbnailIcons.push(
      <span
        onClick={() => updateSelectedImageId(photo.id)}
        onKeyDown={() => updateSelectedImageId(photo.id)}
        aria-label="expanded view thumbnail icon"
        tabIndex="0"
        role="button"
        className={photo.image === selectedImageUrl ? 'thumbnail-icon-highlighted' : 'thumbnail-icon'}
      />,
    );
  });

  return (
    <div className="expanded-view-container">
      <span
        className="expanded-image-container"
        onClick={updateMagnified}
        onKeyDown={updateMagnified}
        tabIndex="0"
        aria-label="expanded image"
        role="button"
      >
        <img className={magnified ? 'magnified-image' : 'expanded-image'} src={selectedImageUrl} alt="" />
      </span>
      <span
        className="close-expanded-view"
        onClick={updateExpandedView}
        onKeyDown={updateExpandedView}
        aria-label="close expanded view"
        tabIndex="0"
        role="button"
      >
        <Icon icon={closeIcon} />
      </span>
      {(previousImageId !== '' && !magnified) && (
        <span
          className="expanded-view-left-arrow"
          onClick={() => updateSelectedImageId(previousImageId)}
          onKeyDown={() => updateSelectedImageId(previousImageId)}
          tabIndex="0"
          aria-label="previous image"
          role="button"
        >
          <Icon icon={arrowLeftBoldOutline} />
        </span>
      )}
      {(nextImageId !== '' && !magnified) && (
        <span
          className="expanded-view-right-arrow"
          onClick={() => updateSelectedImageId(nextImageId)}
          onKeyDown={() => updateSelectedImageId(nextImageId)}
          tabIndex="0"
          aria-label="next image"
          role="button"
        >
          <Icon icon={arrowRightBoldOutline} />
        </span>
      )}
      {!magnified && (
        <div
          className="expanded-view-thumbnail-icon-container"
        >
          {thumbnailIcons}
        </div>
      )}
    </div>
  );
};

ExpandedView.propTypes = {
  selectedImageUrl: PropTypes.string.isRequired,
  updateExpandedView: PropTypes.func.isRequired,
  nextImageId: PropTypes.number,
  previousImageId: PropTypes.number,
  updateSelectedImageId: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  magnified: PropTypes.bool.isRequired,
  updateMagnified: PropTypes.func.isRequired,
};

ExpandedView.defaultProps = {
  nextImageId: '',
  previousImageId: '',
};

export default ExpandedView;
