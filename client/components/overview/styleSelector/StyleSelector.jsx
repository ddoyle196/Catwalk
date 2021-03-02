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
      styleCircles.push(
        <div
          onClick={() => updateSelectedStyle(s.name)}
          onKeyDown={() => updateSelectedStyle(s.name)}
          role="button"
          tabIndex="0"
          aria-label={`Select ${s.name} style`}
          key={keyCount}
          className="style-circle"
          style={{ backgroundColor: s.name }}
        >
          {s.name === selectedStyle && (
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
          {selectedStyle.toUpperCase()}
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
  selectedStyle: PropTypes.string.isRequired,
  updateSelectedStyle: PropTypes.func.isRequired,
};

export default StyleSelector;
