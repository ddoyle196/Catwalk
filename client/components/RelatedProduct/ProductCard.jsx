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
};

export default ProductCard;
