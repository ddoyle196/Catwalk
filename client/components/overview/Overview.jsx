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
      outOfStock: false,
      cart: [],
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.updateSelectedStyle = this.updateSelectedStyle.bind(this);
    this.isFavoriteHandler = this.isFavoriteHandler.bind(this);
    this.updateSelectedSize = this.updateSelectedSize.bind(this);
    this.updateSelectedQuantity = this.updateSelectedQuantity.bind(this);
    this.updateOutOfStock = this.updateOutOfStock.bind(this);
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

  addToCartHandler() {
    const {
      cart,
      product,
      selectedStyle,
      selectedSize,
      selectedQuantity,
    } = this.state;

    if (selectedStyle !== null && selectedQuantity !== null) {
      const cartItem = {
        product: product.id,
        style: selectedStyle.style_id,
        size: selectedSize,
        quantity: selectedQuantity,
      };

      // update the quantity of the selected size of the currently selected style
      const sizes = selectedStyle.skus;
      const sizeKeys = Object.keys(selectedStyle.skus);
      for (let i = 0; i < sizeKeys.length; i += 1) {
        const sizeKey = sizeKeys[i];
        if (sizes[sizeKey].size === selectedSize) {
          sizes[sizeKey].quantity -= Number(selectedQuantity);
          break;
        }
      }

      this.setState({
        cart: [...cart, cartItem],
        selectedSize: null,
        selectedQuantity: null,
        selectedStyle,
      });
    }
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
      outOfStock: false,
    });
  }

  updateSelectedSize(size) {
    this.setState({
      selectedSize: size,
      selectedQuantity: '1',
    });
  }

  updateSelectedQuantity(quantity) {
    this.setState({
      selectedQuantity: quantity,
    });
  }

  updateOutOfStock() {
    this.setState({
      outOfStock: true,
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
      outOfStock,
    } = this.state;

    if (product === null || styles === null || ratings === null || selectedStyle === null) {
      return null;
    }

    return (
      <div className="overview-container">
        <div className="overview-top-container">
          <div className="overview-top-left-container">
            <ImageGallery styles={styles} selectedStyle={selectedStyle} />
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
              updateOutOfStock={this.updateOutOfStock}
              outOfStock={outOfStock}
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
