import React from 'react';
import ProductCard from './ProductCard';

const RelatedProduct = class extends React.PureComponent {
  render() {
    return (
      <div className="rp-box">
        <span className="rp-box-title">RELATED PRODUCTS</span>
        <div className="rp-scroll-horizontal">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    );
  }
};

export default RelatedProduct;
