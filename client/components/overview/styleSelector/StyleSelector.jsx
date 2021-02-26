import React from 'react';
import PropTypes from 'prop-types';

const StyleSelector = ({ styles }) => (
  <div>
    <h2>STYLE SELECTOR COMPONENT</h2>
    <p>{styles[0].name}</p>
    <p>{styles[1].name}</p>
    <p>{styles[2].name}</p>
  </div>
);

StyleSelector.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StyleSelector;
