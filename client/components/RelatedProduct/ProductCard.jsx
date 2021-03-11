/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../shared/Modal';
import StarRating from '../overview/productInfo/StarRating';
import CardThumbnail from './CardThumbnails';

const ProductCard = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showComparisonModal: false,
      productComparison: [],
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processProductStyles = this.processProductStyles.bind(this);
    this.processProductComparison = this.processProductComparison.bind(this);
    this.displayDataOnModal = this.displayDataOnModal.bind(this);
  }

  handleCloseModal(modalType) {
    if (modalType === 'comparison') {
      this.setState({
        showComparisonModal: false,
      });
    }
  }

  processProductStyles() {
    const { thumbnailImages } = this.props;
    return (
      <CardThumbnail
        thumbnailUrl={thumbnailImages}
      />
    );
  }

  processProductComparison() {
    const { parentProductFeatures, productFeatures } = this.props;
    const mergeData = (arr1, arr2) => {
      let getRelated = [];
      getRelated = arr1.map((obj) => {
        const index = arr2.findIndex((el) => el.feature === obj.feature);
        const toMergeStyle = index !== -1 ? { value1: arr2[index].value } : {};
        return {
          ...obj,
          ...toMergeStyle,
        };
      });
      arr2.map((obj) => {
        const index = arr1.findIndex((el) => el.feature === obj.feature);
        return index !== -1 ? {} : getRelated.push(obj);
      });
      return getRelated;
    };
    const productComparison = mergeData(parentProductFeatures, productFeatures);
    console.log(productComparison);
    // this.setState({
    //   productComparison,
    // }, () => {
    //   // this.displayDataOnModal();
    // });
  }

  displayDataOnModal() {
    const { productComparison } = this.state;
    return (
      <div>
        <span>{productComparison}</span>
      </div>
    );
  }

  render() {
    const { showComparisonModal } = this.state;
    const {
      productId,
      name,
      category,
      ratings,
      price,
      salePrice,
    } = this.props;
    return (
      <div className="rp-single-box">
        <Modal
          showModal={showComparisonModal}
          handleCloseModal={this.handleCloseModal}
          handleSubmit={() => {}}
          modalType="comparison"
          modalCode=""
        >
          <span className="">HI</span>
          {this.processProductComparison()}
        </Modal>
        {this.processProductStyles()}
        <div className="rp-product-details">
          <div className="rp-product-category">
            <span>{category}</span>
          </div>
          <div className="rp-product-name">
            <span>{name}</span>
          </div>
          <div className="rp-product-price">
            <span className={`rp-regular-price ${salePrice === 0 ? '' : 'line-through'}`}>{`$${price}`}</span>
            <span className={`rp-sale-price red-colored ${salePrice === 0 ? 'no-display' : ''}`}>{`$${salePrice}`}</span>
          </div>
          <div className="rp-product-rating">
            <StarRating ratings={ratings} />
          </div>
        </div>
      </div>
    );
  }
};

ProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }).isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  salePrice: PropTypes.number.isRequired,
  thumbnailImages: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  parentProductFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  productFeatures: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ProductCard;
