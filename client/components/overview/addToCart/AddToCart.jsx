import React from 'react';
import PropTypes from 'prop-types';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const AddToCart = ({ addToCartHandler }) => (
  <div>
    <div className="cart-top-container">
      <SizeSelector />
      <QuantitySelector />
    </div>
    <button type="submit" onClick={addToCartHandler}>Add to cart</button>
  </div>
);

AddToCart.propTypes = {
  addToCartHandler: PropTypes.func.isRequired,
};

export default AddToCart;
