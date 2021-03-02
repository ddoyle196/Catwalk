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
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.updateSelectedStyle = this.updateSelectedStyle.bind(this);
  }

  componentDidMount() {
    this.getProductAndStyles(19378);
  }

  getProductAndStyles(productId) {
    let product = {};
    let styles = [];
    let selectedStyle = '';
    axios.get(`/products/${productId}`)
      .then((response) => {
        product = response.data;
        axios.get(`products/${productId}/styles`)
          .then((res) => {
            styles = res.data.results;
            selectedStyle = styles[0].name;
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

  // eslint-disable-next-line class-methods-use-this
  updateSelectedStyle(name) {
    this.setState({
      selectedStyle: name,
    });
  }

  render() {
    const {
      product,
      styles,
      ratings,
      selectedStyle,
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
            <AddToCart addToCartHandler={this.addToCartHandler} />
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
