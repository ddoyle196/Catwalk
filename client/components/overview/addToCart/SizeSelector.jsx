import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const SizeSelector = ({ selectedStyle, selectedSize, updateSelectedSize }) => {
  const sizes = selectedStyle.skus;
  console.log('SIZES OBJECT: ', sizes);
  const sizeKeys = Object.keys(selectedStyle.skus);
  console.log('SIZE KEYS: ', sizeKeys);
  const options = [];
  let keyCount = 0;
  for (let i = 0; i < sizeKeys.length; i += 1) {
    const sizeKey = sizeKeys[i];
    keyCount += 1;
    options.push(<option key={keyCount} value={sizes[sizeKey].size}>{sizes[sizeKey].size}</option>);
  }
  console.log('OPTIONS: ', options);
  return (
    <div className="size-selector-container">
      <select
        onChange={(e) => updateSelectedSize(e.target.value)}
        value={selectedSize || 'select-size'}
        className="size-selector"
      >
        {selectedSize === null && <option value="select-size">SELECT SIZE</option>}
        {options}
      </select>
      <span className="option-arrow-icon"><Icon icon={chevronDown} /></span>
    </div>
  );
};

SizeSelector.propTypes = {
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
  selectedSize: PropTypes.string,
  updateSelectedSize: PropTypes.func.isRequired,
};

SizeSelector.defaultProps = {
  selectedSize: null,
};

export default SizeSelector;
