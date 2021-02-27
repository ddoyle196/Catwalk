import React from 'react';
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
      product: productDummyData,
      styles: stylesDummyData.results,
    };
    this.addToCartHandler.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  addToCartHandler() {
    // eslint-disable-next-line no-console
    console.log('Add to cart handler was clicked!');
  }

  render() {
    const { product, styles } = this.state;
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
