import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Reviews from './Reviews';
import Histograms from './Histograms';

class RandR extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      productId: props.productId,
      page: 1,
      count: 10,
      reviews: null,
      sort: 'relevant',
    };
  }

  componentDidMount() {
    this.updateMetaData();
    this.updateReviews();
  }

  updateMetaData() {
    const { productId } = this.state;
    const { ratings } = this.state;
    axios.get(`metadata/${productId}`)
      .then((r) => {
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
    const { reviews } = this.state;

    const params = {
      page,
      count,
      sort,
      productId,
    };

    axios.get('http://localhost:3000/reviews', { params })
      .then((r) => {
        this.setState({
          reviews: r.data,
        });
      });
  }

  render() {
    const { reviews, ratings, sort } = this.state;
    let voteCount = 0;
    if (ratings) {
      for (const key in ratings.ratings) {
      voteCount += Number(ratings.ratings[key]);
      }
    }
    return (
      <div className="r-box">
        <div className="headerBlock">RATINGS & REVIEWS</div>
        <div className="histogramBlock">
          {ratings ? <Histograms ratings={ratings} /> : null}
        </div>
        <div className="reviewBlock">
          {reviews && ratings ? (
            <Reviews
              reviews={reviews}
              sort={sort}
              ratings={voteCount}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

// RandR.propTypes = {
//   productId: PropTypes.number.isRequired,
// };

export default RandR;
