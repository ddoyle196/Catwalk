import React from 'react';
import PropTypes from 'prop-types';

class MagnifiedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: undefined,
      yPosition: undefined,
    };
    this.updateCoordinates = this.updateCoordinates.bind(this);
  }

  updateCoordinates(e) {
    this.setState({
      xPosition: e.nativeEvent.offsetX,
      yPosition: e.nativeEvent.offsetY,
    });
  }

  render() {
    const { magnifiedStartingCoordinates, selectedImageUrl } = this.props;
    const [startingX, startingY] = magnifiedStartingCoordinates;
    const { xPosition, yPosition } = this.state;
    return (
      <div
        onMouseMove={this.updateCoordinates}
        className="magnified-image"
        style={{ backgroundImage: `url(${selectedImageUrl})`, backgroundPositionX: `-${(xPosition || startingX) * 1.5}px`, backgroundPositionY: `-${(yPosition || startingY) * 1.75}px` }}
      />
    );
  }
}

MagnifiedView.propTypes = {
  magnifiedStartingCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedImageUrl: PropTypes.string.isRequired,
};

export default MagnifiedView;
