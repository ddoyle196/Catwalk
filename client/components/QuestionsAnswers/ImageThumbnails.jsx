import React from 'react';
import PropTypes from 'prop-types';

const ImageThumbnails = class extends React.PureComponent {
  render() {
    const { photo, showImageModal } = this.props;
    const { url } = photo;
    return (
      <div
        className="qa-image-box"
        onClick={() => showImageModal(url)}
        role="button"
        onKeyDown={this.handleButtonClick}
        tabIndex={0}
      >
        <img
          className="qa-image-thumbnails pointer"
          src={url}
          alt="thumbnails"
        />
      </div>
    );
  }
};

ImageThumbnails.propTypes = {
  showImageModal: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageThumbnails;
