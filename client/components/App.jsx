import React from 'react';
// import Overview from './overview/Overview';
import RandR from './RandR/index';
import Overview from './overview/Overview';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
// import Config from '../../config.js';

const App = () => (
  <div>
    <Overview />
    {/* <RandR /> */}
    <QuestionsAnswers />
  </div>
);

export default App;
