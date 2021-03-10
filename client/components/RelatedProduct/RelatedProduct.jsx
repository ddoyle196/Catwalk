/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { GITHUB_API_KEY } from '../../../config';
import { get } from 'jquery';

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
              .filter((singleStyle) => !!singleStyle['default?'])[0];
            const newDefault = getDefault === undefined ? results[0] : getDefault;
            const getThumbnailImages = newDefault
              .photos.map((thumbnails) => (thumbnails.thumbnail_url));
            const newThumbnailImage = getThumbnailImages[0] === null ? ['https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'] : getThumbnailImages;
            const { sale_price } = newDefault;
            return (
              <ProductCard
                key={id}
                productId={id}
                name={name}
                ratings={ratings}
                price={Number(default_price)}
                category={category}
                thumbnailImages={newThumbnailImage}
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
