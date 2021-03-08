import React from 'react';
// import Overview from './overview/Overview';
import RandR from './RandR/index';
import Overview from './overview/Overview';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedProduct from './RelatedProduct/RelatedProduct';
// import Config from '../../config.js';

const App = () => (
  <div>
    {/* <Overview />
    <QuestionsAnswers /> */}
    {/* <RelatedProduct /> */}
    <RandR productId={19382} pName="Enoch Tank Top" />
  </div>
);

export default App;
