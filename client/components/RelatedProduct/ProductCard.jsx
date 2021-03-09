import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../shared/Modal';
import StarRating from '../overview/productInfo/StarRating';

const ProductCard = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showComparisonModal: false,
      thumbnailImageIndex: 1,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(modalType) {
    if (modalType === 'comparison') {
      this.setState({
        showComparisonModal: false,
      });
    }
  }

  handleThumbnailImage(index) {
    const { thumbnailImageIndex } = this.state;
    let newIndex = thumbnailImageIndex + index;
    if (newIndex > 4) {
      newIndex = 1;
    }
    if (newIndex < 1) {
      newIndex = 4;
    }
    this.setState({
      thumbnailImageIndex: newIndex,
    });
  }

  processProductStyles() {
    const { styles } = this.props;
  }

  render() {
    const { showComparisonModal, thumbnailImageIndex } = this.state;
    const {
      productId,
      name,
      category,
      ratings,
      price,
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
        <div className="rp-image-box">
          <span className="rp-starred">S</span>
          <img
            className={`rp-product-thumbnail ${thumbnailImageIndex === 1 ? '' : 'no-display'}`}
            src="https://cdn.mos.cms.futurecdn.net/otjbibjaAbiifyN9uVaZyL.jpg"
            alt="imageRelatedProduct1"
          />
          <img
            className={`rp-product-thumbnail ${thumbnailImageIndex === 2 ? '' : 'no-display'}`}
            src="https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_581/master/969.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a368f449b1cc1f37412c07a1bd901fb5"
            alt="imageRelatedProduct2"
          />
          <img
            className={`rp-product-thumbnail ${thumbnailImageIndex === 3 ? '' : 'no-display'}`}
            src="https://woodgreen.org.uk/image/image/image/V8Iw3SL87ubcIekoP1DmmhekPFXPNbBL5yB4JpVR.jpeg?w=800&h=422&fit=crop-center"
            alt="imageRelatedProduct3"
          />
          <img
            className={`rp-product-thumbnail ${thumbnailImageIndex === 4 ? '' : 'no-display'}`}
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-937042456-1580320856.jpg?crop=0.670xw:1.00xh;0.106xw,0&resize=480:*"
            alt="imageRelatedProduct4"
          />
          <button
            className="rp-button-left"
            onClick={() => this.handleThumbnailImage(-1)}
            type="button"
          >
            &#10094;
          </button>
          <button
            className="rp-button-right"
            onClick={() => this.handleThumbnailImage(1)}
            type="button"
          >
            &#10095;
          </button>
        </div>
        <div className="rp-product-details">
          <div className="rp-product-category">
            <span>{category}</span>
          </div>
          <div className="rp-product-name">
            <span>{name}</span>
          </div>
          <div className="rp-product-price">
            <span className="rp-regular-price">{`$${price}`}</span>
            <span className="rp-sale-price red-colored no-display">$99.99</span>
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
  styles: PropTypes.arrayOf.isRequired,
};

export default ProductCard;
