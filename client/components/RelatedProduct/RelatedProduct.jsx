/* eslint-disable camelcase */
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
          {relatedProducts.map((singleRelatedProduct) => {
            const {
              id, name, ratings, default_price, category, results,
            } = singleRelatedProduct;
            const getDefault = results
              .filter((singleStyle) => singleStyle['default?'])[0];
            const getThumbnailImages = getDefault
              .photos.map((thumbnails) => (thumbnails.thumbnail_url));
            const { sale_price } = getDefault;
            return (
              <ProductCard
                key={id}
                productId={id}
                name={name}
                ratings={ratings}
                price={Number(default_price)}
                category={category}
                thumbnailImages={getThumbnailImages}
                salePrice={Number(sale_price)}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

RelatedProduct.propTypes = {
  pId: PropTypes.number.isRequired,
};

export default RelatedProduct;
