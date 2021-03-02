import React from 'react';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const QuantitySelector = () => (
  <div className="quantity-selector-container">
    <select className="quantity-selector">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <span className="option-arrow-icon"><Icon icon={chevronDown} /></span>
  </div>
);

export default QuantitySelector;
