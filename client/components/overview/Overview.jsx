/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import ImageGallery from './imageGallery/ImageGallery';
import SideProductInfo from './productInfo/SideProductInfo';
import BottomProductInfo from './productInfo/BottomProductInfo';
import StyleSelector from './styleSelector/StyleSelector';
import AddToCart from './addToCart/AddToCart';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      styles: null,
      ratings: null,
      selectedStyle: null,
      selectedSize: null,
      selectedQuantity: null,
      isFavorite: false,
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.updateSelectedStyle = this.updateSelectedStyle.bind(this);
    this.isFavoriteHandler = this.isFavoriteHandler.bind(this);
    this.updateSelectedSize = this.updateSelectedSize.bind(this);
    this.updateSelectedQuantity = this.updateSelectedQuantity.bind(this);
  }

  componentDidMount() {
    this.getProductAndStyles(19378);
  }

  getProductAndStyles(productId) {
    let product = {};
    let styles = [];
    axios.get(`/products/${productId}`)
      .then((response) => {
        product = response.data;
        axios.get(`products/${productId}/styles`)
          .then((res) => {
            styles = res.data.results;
            const [selectedStyle] = styles;
            axios.get(`metadata/${productId}`)
              .then((r) => {
                this.setState({
                  product,
                  styles,
                  selectedStyle,
                  ratings: r.data.ratings,
                });
              });
          });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  addToCartHandler() {
    // eslint-disable-next-line no-console
    console.log('Add to cart handler was clicked!');
  }

  isFavoriteHandler() {
    const { isFavorite } = this.state;
    this.setState({
      isFavorite: !isFavorite,
    });
  }

  updateSelectedStyle(style) {
    this.setState({
      selectedStyle: style,
      selectedSize: null,
      selectedQuantity: null,
    });
  }

  updateSelectedSize(size) {
    console.log('SELECTED SIZE: ', size);
    this.setState({
      selectedSize: size,
    });
  }

  updateSelectedQuantity(quantity) {
    console.log('SELECTED QUANTITY: ', quantity);
    this.setState({
      selectedQuantity: quantity,
    });
  }

  render() {
    const {
      product,
      styles,
      ratings,
      selectedStyle,
      selectedSize,
      selectedQuantity,
      isFavorite,
    } = this.state;

    if (product === null || styles === null || ratings === null || selectedStyle === null) {
      return null;
    }

    return (
      <div className="overview-container">
        <div className="overview-top-container">
          <div className="overview-top-left-container">
            <ImageGallery styles={styles} />
          </div>
          <div className="overview-top-right-container">
            <SideProductInfo product={product} ratings={ratings} />
            <StyleSelector
              styles={styles}
              selectedStyle={selectedStyle}
              updateSelectedStyle={this.updateSelectedStyle}
            />
            <AddToCart
              addToCartHandler={this.addToCartHandler}
              isFavorite={isFavorite}
              isFavoriteHandler={this.isFavoriteHandler}
              styles={styles}
              selectedStyle={selectedStyle}
              selectedSize={selectedSize}
              selectedQuantity={selectedQuantity}
              updateSelectedSize={this.updateSelectedSize}
              updateSelectedQuantity={this.updateSelectedQuantity}
            />
          </div>
        </div>
        <div className="overview-bottom-container">
          <BottomProductInfo product={product} />
        </div>
      </div>
    );
  }
}

export default Overview;
