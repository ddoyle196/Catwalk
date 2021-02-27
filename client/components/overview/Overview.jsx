/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import ImageGallery from './imageGallery/ImageGallery';
import SideProductInfo from './productInfo/SideProductInfo';
import BottomProductInfo from './productInfo/BottomProductInfo';
import StyleSelector from './styleSelector/StyleSelector';
import AddToCart from './addToCart/AddToCart';

// import stylesDummyData from '../dummy_data/stylesDummyData.json';
// import productDummyData from '../dummy_data/productDummyData.json';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      styles: null,
    };
    this.addToCartHandler.bind(this);
  }

  componentDidMount() {
    this.getProductAndStyles(19378);
  }

  getProductAndStyles(productId) {
    let product = {};
    axios.get(`/products/${productId}`)
      .then((response) => {
        product = response.data;
        axios.get(`products/${productId}/styles`)
          .then((res) => {
            this.setState({
              product,
              styles: res.data.results,
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

  render() {
    const { product, styles } = this.state;
    if (product === null || styles === null) {
      return null;
    }
    return (
      <div>
        <ImageGallery styles={styles} />
        <SideProductInfo product={product} />
        <StyleSelector styles={styles} />
        <AddToCart addToCartHandler={this.addToCartHandler} />
        <BottomProductInfo product={product} />
      </div>
    );
  }
}

export default Overview;
