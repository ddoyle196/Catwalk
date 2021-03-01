import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = ({ styles, selectedStyle }) => {
  let keyCount = 0;
  const colors = [];
  const styleCircles = [];
  styles.forEach((s) => {
    if (!colors.includes(s.name)) {
      colors.push(s.name);
      keyCount += 1;
      styleCircles.push(
        <div key={keyCount} className="style-circle" style={{ backgroundColor: s.name }} />,
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
};

export default StyleSelector;
