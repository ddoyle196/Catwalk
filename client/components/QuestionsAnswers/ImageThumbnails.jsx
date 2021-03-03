import React from 'react';
import PropTypes from 'prop-types';

const ImageThumbnails = class extends React.PureComponent {
  render() {
    const { photo } = this.props;
    const { url } = photo;
    return (
      <div className="qa-image-box">
        <img className="qa-image-thumbnails" src={url} alt="thumbnails" />
      </div>
    );
  }
};

ImageThumbnails.propTypes = {
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageThumbnails;
