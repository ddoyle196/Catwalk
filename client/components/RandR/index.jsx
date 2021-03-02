import React from 'react';
import $ from 'jquery';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Reviews from './Reviews';
import Histograms from './Histograms';

import dummy from './dummy';

class RandR extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      productId: props.productId,
      page: 1,
      count: 5,
      reviews: null,
      sort: 'newest',
    };
  }

  componentDidMount() {
    this.updateMetaData();
    this.updateReviews();
  }

  updateMetaData() {
    const { productId } = this.state;
    let { ratings } = this.state;
    axios.get(`metadata/${productId}`)
      .then((r) => {
        console.log(r);
        this.setState({
          ratings: r.data,
        });
      });
  }

  updateReviews() {
    // get reviews
    const {
      productId, page, count, sort,
    } = this.state;
    let { reviews } = this.state;

    const params = {
      page: page,
      count: count,
      sort: sort,
      productId: productId,
    };

    axios.get('http://localhost:3000/reviews', { params })
      .then((r) => {
        console.log(r);
        this.setState({
          reviews: r.data,
        });
      });
  }

  render() {
    const { reviews, ratings } = this.state;
    return (
      <div>
        <div className="headerBlock">RATINGS & REVIEWS</div>
        <div className="histogramBlock">
         {ratings ?  <Histograms ratings={ratings} /> : null}
        </div>
        <div className="reviewBlock">
          {reviews ? <Reviews reviews={reviews} /> : null}
        </div>
      </div>
    );
  }
}

// RandR.propTypes = {
//   productId: PropTypes.number.isRequired,
// };

export default RandR;
