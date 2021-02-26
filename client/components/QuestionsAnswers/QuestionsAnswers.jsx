import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../../config';

const QuestionsAnswers = class extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      config: Config.GITHUB_API_KEY,
    };
  }

  render() {
    return (
      <div>{ this.state.config }</div>
    );
  }
};

export default QuestionsAnswers;
