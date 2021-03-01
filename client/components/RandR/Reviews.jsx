import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Reviews extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      displayCount: 0,
      remaining: props.reviews.length,
    };
  }

  componentDidMount() {
    this.renderTwo();
  }

  renderTwo() {
    const { reviews } = this.state;
    let { displayCount, remaining } = this.state;
    this.setState({ displayCount: displayCount += 2, remaining: remaining -= 2 });
    const section = reviews.slice(0, displayCount);
    const RL = section.map((review) => (
      <h3>
        {review.summary}
      </h3>
    ));
    ReactDOM.render(RL, document.getElementById('reviewList'));
  }

  render() {
    const { remaining } = this.state;
    const renderTwo = this.renderTwo.bind(this);
    return (
      <div>
        <div> Reviews </div>
        <div id="reviewList" />
        {remaining > 0 ? <button type="button" onClick={renderTwo}>More Reviews</button> : null}
      </div>
    );
  }
}
// Reviews.propTypes = {
//   reviews: PropTypes.array.isRequired,
// };

export default Reviews;
