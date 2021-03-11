import React from 'react';
import RandR from './RandR/index';
import Overview from './overview/Overview';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedProduct from './RelatedProduct/RelatedProduct';
// import Config from '../../config.js';
const pId = 19095;
const pName = 'Alberto Romper';

const App = () => (
  <div>
    {/* <Overview /> */}
    <RelatedProduct pId={pId} />
    {/* <QuestionsAnswers pId={pId} pName={pName} />
    <RandR productId={pId} pName={pName} /> */}
  </div>
);

export default App;
