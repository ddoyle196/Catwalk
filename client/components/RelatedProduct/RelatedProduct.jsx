import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { GITHUB_API_KEY } from '../../../config';

const pId = 19378;

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
    const { relatedProducts } = this.state;
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
