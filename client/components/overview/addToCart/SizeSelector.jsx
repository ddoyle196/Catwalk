import React from 'react';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const SizeSelector = () => (
  <div className="size-selector-container">
    <select className="size-selector">
      <option value="select-size">SELECT SIZE</option>
      <option value="sm">SM</option>
      <option value="m">M</option>
    </select>
    <span className="option-arrow-icon"><Icon icon={chevronDown} /></span>
  </div>
);

export default SizeSelector;
