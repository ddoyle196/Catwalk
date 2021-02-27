import React from 'react';
import $ from 'jquery';
// import PropTypes from 'prop-types';

import Reviews from './Reviews';
import Histograms from './Histograms';

//import dummy from './dummy';

class RandR extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ratings: dummy.metaData,
      itemID: dummy.productReviews.product,
      page: dummy.productReviews.page,
      pageCount: dummy.productReviews.count,
      reviews: dummy.productReviews.results,
    };
  }

  componentDidMount() {
    this.updateReviews();
  }

  updateReviews() {
    // get reviews
    const { itemID, page, pageCount } = this.state;
    $.ajax({
      url: 'http://localhost:3000/test',
      type: 'GET',
      data: { itemID, page, pageCount },
      success: (result) => {
        // this.setState({ reviews: result });
        console.log(result);
      },
    });
    // update state of reviews
  }

  render() {
    const { reviews, ratings } = this.state;
    return (
      <div>
        <div className="headerBlock">RATINGS & REVIEWS</div>
        <div className="histogramBlock">
          <Histograms ratings={ratings} />
        </div>
        <div className="reviewBlock">
          <Reviews reviews={reviews} />
        </div>
      </div>
    );
  }
}

// RandR.propTypes = {
//   itemID: PropTypes.number.isRequired,
// };

export default RandR;
