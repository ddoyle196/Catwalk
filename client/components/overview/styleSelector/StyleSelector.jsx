import React from 'react';
import { Icon } from '@iconify/react';
import checkCircleOutline from '@iconify-icons/mdi/check-circle-outline';

import PropTypes from 'prop-types';

const StyleSelector = ({ styles, selectedStyle, updateSelectedStyle }) => {
  let keyCount = 0;
  const colors = [];
  const styleCircles = [];
  styles.forEach((s) => {
    if (!colors.includes(s.name)) {
      colors.push(s.name);
      keyCount += 1;
      const stylePhoto = s.photos[0].url;
      styleCircles.push(
        <div
          onClick={() => updateSelectedStyle(s)}
          onKeyDown={() => updateSelectedStyle(s)}
          role="button"
          tabIndex="0"
          aria-label={`Select ${s.name} style`}
          key={keyCount}
          className="style-circle"
        >
          <img className="style-circle-image" src={stylePhoto} alt="" />
          {s.name === selectedStyle.name && (
            <span>
              <span className="selected-check-background" />
              <span className="selected-check-container">
                <Icon icon={checkCircleOutline} />
              </span>
            </span>
          )}
        </div>,
      );
    }
  });
  return (
    <div>
      <p>
        <strong>
          <span className="style-label">STYLE</span>
          &gt;
        </strong>
        <span className="selected-style-text">
          {selectedStyle.name.toUpperCase()}
        </span>
      </p>
      <div className="style-circles-container">
        {styleCircles}
      </div>
    </div>
  );
};

StyleSelector.propTypes = {
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
  updateSelectedStyle: PropTypes.func.isRequired,
};

export default StyleSelector;
