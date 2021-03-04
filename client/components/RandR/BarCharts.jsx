/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';

export const Charts = (headObj) => {
  const { ratings, recommended, characteristics } = headObj;
  console.log(headObj);

  const starLevels = ['1 stars', '2 stars', '3 stars', '4 stars', '5 stars'];
  const barStats = [];
  // eslint-disable-next-line guard-for-in

  let benchmark;

  for (let i = 1; i < starLevels.length; i += 1) {
    if (Number(ratings[i])) {
      if (benchmark === undefined) {
        benchmark = i;
      } else if (Number(ratings[i]) >= Number(ratings[benchmark])) {
        benchmark = i;
      }
    }
  }

  let voteCount = 0;
  for (const key in ratings) {
    voteCount += Number(ratings[key]);
  }

  for (let i = starLevels.length; i > 0; i -= 1) {
    let temp = {};
    if (Number(ratings[i])) {
      temp.percent = (Number(ratings[i]) / voteCount) * 100;
    } else if (!Number(ratings[i])) {
      temp.percent = 0;
    }
    temp.starLev = starLevels[i - 1];
    temp.count = Number(ratings[i]) || 0;
    barStats.push(temp);
  }
  const rPercent = (Number(recommended[Object.keys(recommended)[0]]) / Number(voteCount)) * 100;

  let charMap = Object.keys(headObj.characteristics);

  return (
    <div>
      <table className="dataTable">
        <tbody>
          <tr className="dataRow">
            <td>
              <div className="starLev">{`${rPercent}% of reviews recommend this product`}</div>
            </td>
          </tr>
          {barStats.map((percentage) => (
            <tr className="dataRow" key={headObj.product_id.concat(percentage.starLev)}>
              <td>
                <div className="starLev">{percentage.starLev}</div>
                <div className="ratingBar">
                  <div className="dataBar voted" style={{ width: `${percentage.percent}%` }} />
                  <div className="dataBar difference" style={{ width: `${100 - percentage.percent}%` }} />
                </div>
                <div className="ratingCount">{percentage.count}</div>
              </td>
            </tr>
          ))}
          {charMap.map((quality) => (
            <tr className="dataRow" key={headObj.characteristics[quality].value}>
              <td>
                <div className="qualityHolder">
                  <div className="quality">{quality}</div>
                  {/* <div className="starLev">{headObj.characteristics[quality].value}</div> */}
                  <div className="fullQBar">
                    <div className="qualityBar" />
                    <div className="qualityBar spacer" />
                    <div className="qualityBar" />
                    <div className="qualityBar spacer" />
                    <div className="qualityBar" />
                  </div>
                  <div className="qualityArrow" style={{ width: `${headObj.characteristics[quality].value * 20}% ` }}>&#9660;</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TotalRating = (ratings) => {
  let ratingTotal = 0;
  let voteCount = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in ratings) {
    ratingTotal += Number(key) * Number(ratings[key]);
    voteCount += Number(ratings[key]);
  }
  const ratingVal = (Math.round((ratingTotal / voteCount) * 4) / 4).toFixed(2);
  return ratingVal;
};
