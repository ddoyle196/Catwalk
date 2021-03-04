import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify-icons/mdi/plus';
import starOutline from '@iconify-icons/mdi/star-outline';
import star from '@iconify-icons/mdi/star';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const AddToCart = ({
  addToCartHandler,
  isFavorite,
  isFavoriteHandler,
  // styles
  selectedStyle,
  selectedSize,
  selectedQuantity,
  updateSelectedSize,
  updateSelectedQuantity,
}) => (
  <div>
    <div className="cart-top-container">
      <SizeSelector
        selectedStyle={selectedStyle}
        selectedSize={selectedSize}
        updateSelectedSize={updateSelectedSize}
      />
      <QuantitySelector
        selectedStyle={selectedStyle}
        selectedSize={selectedSize}
        selectedQuantity={selectedQuantity}
        updateSelectedQuantity={updateSelectedQuantity}
      />
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
  // styles: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.object),
    skus: PropTypes.objectOf(PropTypes.shape({
      quantity: PropTypes.number,
      size: PropTypes.string,
    })),
  }).isRequired,
  selectedSize: PropTypes.string,
  selectedQuantity: PropTypes.string,
  updateSelectedSize: PropTypes.func.isRequired,
  updateSelectedQuantity: PropTypes.func.isRequired,
};

AddToCart.defaultProps = {
  selectedSize: null,
  selectedQuantity: null,
};

export default AddToCart;
