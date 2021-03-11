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
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.processProductStyles = this.processProductStyles.bind(this);
    this.processProductComparison = this.processProductComparison.bind(this);
    this.showComparisonModal = this.showComparisonModal.bind(this);
  }

  handleCloseModal(modalType) {
    if (modalType === 'comparison') {
      this.setState({
        showComparisonModal: false,
      });
    }
  }

  showComparisonModal(modalType) {
    if (modalType === 'comparison') {
      this.setState({
        showComparisonModal: true,
      });
    }
  }

  processProductStyles() {
    const { thumbnailImages } = this.props;
    return (
      <CardThumbnail
        thumbnailUrl={thumbnailImages}
        openModal={() => this.showComparisonModal('comparison')}
      />
    );
  }

  processProductComparison() {
    const {
      parentProductFeatures, productFeatures, parentProductName, name,
    } = this.props;
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
        return index !== -1 ? {} : getRelated.push({ feature: obj.feature, value1: obj.value });
      });
      return getRelated;
    };

    const productComparison = mergeData(parentProductFeatures, productFeatures);

    return (
      <div className="rp-comparing-modal">
        <div>
          <span className="rp-comparing-title">COMPARING</span>
        </div>
        <table className="rp-comparing-table">
          <thead className="rp-table-head">
            <tr>
              <th>{ parentProductName }</th>
              <th>{' '}</th>
              <th>{ name }</th>
            </tr>
          </thead>
          <tbody className="rp-table-body">
            {productComparison.map((feature) => (
              <tr key={feature.feature}>
                <td className="rp-parent-product-value">{feature.value === null || feature.value === undefined ? '' : String.fromCharCode(10003)}</td>
                <td className="rp-product-feature">{feature.feature}</td>
                <td className="rp-product-value">{feature.value1 === null || feature.value1 === undefined ? '' : String.fromCharCode(10003)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // &#10003;

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
          modalType="product-comparison"
          modalCode=""
        >
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
      value: PropTypes.string,
    }).isRequired,
  ).isRequired,
  parentProductName: PropTypes.string.isRequired,
};

export default ProductCard;
