import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify-icons/mdi/plus';
import starOutline from '@iconify-icons/mdi/star-outline';
import star from '@iconify-icons/mdi/star';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const AddToCart = ({ addToCartHandler, isFavorite, isFavoriteHandler }) => (
  <div>
    <div className="cart-top-container">
      <SizeSelector />
      <QuantitySelector />
    </div>
    <div className="cart-bottom-container">
      <div className="add-to-cart-container">
        <div
          type="submit"
          tabIndex="0"
          onKeyDown={addToCartHandler}
          aria-label="Add to bag"
          role="button"
          onClick={addToCartHandler}
          className="add-to-cart-button"
        >
          ADD TO BAG
        </div>
        <span className="plus-icon"><Icon icon={plusIcon} /></span>
      </div>
      <span
        className="mark-as-favorite"
        onClick={isFavoriteHandler}
        onKeyDown={isFavoriteHandler}
        role="button"
        tabIndex="0"
        aria-label="Select as favorite"
      >
        {isFavorite ? <Icon icon={star} color="gold" /> : <Icon icon={starOutline} /> }
      </span>
    </div>
  </div>
);

AddToCart.propTypes = {
  addToCartHandler: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isFavoriteHandler: PropTypes.func.isRequired,
};

export default AddToCart;
