/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const RelatedProduct = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      parentProductFeatures: [],
      parentProductName: '',
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.handleNoRelatedProducts = this.handleNoRelatedProducts.bind(this);
    this.getProductFeatures = this.getProductFeatures.bind(this);
  }

  componentDidMount() {
    this.getRelatedProducts();
    this.getProductFeatures();
  }

  handleNoRelatedProducts() {
    const { relatedProducts } = this.state;
    if (relatedProducts.length === 0) {
      return (
        <span className="no-related-products">There are related products</span>
      );
    }
    return null;
  }

  getProductFeatures() {
    const { pId } = this.props;
    axios.get(`/products/${pId}`)
      .then((result) => {
        this.setState({
          parentProductFeatures: result.data.features,
          parentProductName: result.data.name,
        });
      });
  }

  getRelatedProducts() {
    const { pId } = this.props;
    axios.get(`/related/${pId}`)
      .then((result) => {
        this.setState({
          relatedProducts: result.data,
        });
      });
  }

  render() {
    const { relatedProducts, parentProductFeatures, parentProductName } = this.state;
    return (
      <div className="rp-box">
        <span className="rp-box-title">RELATED PRODUCTS</span>
        <div className="rp-scroll-horizontal">
          {this.handleNoRelatedProducts()}
          {relatedProducts.map((singleRelatedProduct) => {
            const {
              id, name, ratings, default_price, category, results, features,
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
                parentProductFeatures={parentProductFeatures}
                parentProductName={parentProductName}
                productFeatures={features}
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
