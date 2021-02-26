import React from 'react';
import PropTypes from 'prop-types';

const AddToCart = ({ addToCartHandler }) => (
  <div>
    <h2>ADD TO CART HANDLER COMPONENT</h2>
    <button type="submit" onClick={addToCartHandler}>Add to cart</button>
  </div>
);

AddToCart.propTypes = {
  addToCartHandler: PropTypes.func.isRequired,
};

export default AddToCart;
