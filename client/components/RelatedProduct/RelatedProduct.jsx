import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { GITHUB_API_KEY } from '../../../config';

const RelatedProduct = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  componentDidMount() {
    this.getRelatedProducts();
  }

  getRelatedProducts() {
    const { pId } = this.props;
    axios.get(`/related/${pId}`, {
      headers: {
        Authorization: GITHUB_API_KEY,
      },
    })
      .then((result) => {
        console.log(result.data);
        this.setState({
          relatedProducts: result.data,
        });
      });
  }

  render() {
    const { relatedProducts } = this.state;
    return (
      <div className="rp-box">
        <span className="rp-box-title">RELATED PRODUCTS</span>
        <div className="rp-scroll-horizontal">
          {relatedProducts.map((singleRelatedProduct) => (
            <ProductCard
              key={singleRelatedProduct.id}
              productId={singleRelatedProduct.id}
              name={singleRelatedProduct.name}
              ratings={singleRelatedProduct.ratings}
              price={Number(singleRelatedProduct.default_price)}
              category={singleRelatedProduct.category}
              styles={singleRelatedProduct.results}
            />
          ))}
        </div>
      </div>
    );
  }
};

RelatedProduct.propTypes = {
  pId: PropTypes.number.isRequired,
};

export default RelatedProduct;
