import React from 'react';

const ProductCard = class extends React.PureComponent {
  render() {
    return (
      <div className="rp-single-box">
        <div className="rp-image-box">
          <span className="rp-starred">S</span>
          <img
            className="rp-product-thumbnail"
            src="https://cdn.mos.cms.futurecdn.net/otjbibjaAbiifyN9uVaZyL.jpg"
            alt="cat"
          />
        </div>
        <div className="rp-product-details">
          <div className="rp-product-category">
            <span>CATEGORY</span>
          </div>
          <div className="rp-product-name">
            <span>Product Name too long to fit in one line</span>
          </div>
          <div className="rp-product-price">
            <span className="rp-regular-price line-through">$100</span>
            <span className="rp-sale-price red-colored">$99.99</span>
          </div>
          <div className="rp-product-rating">
            <span>RATING</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
