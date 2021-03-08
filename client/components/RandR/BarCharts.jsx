/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';
const { Fragment } = React;

import { Icon, InlineIcon } from '@iconify/react';
import dismissCircle24Filled from '@iconify-icons/fluent/dismiss-circle-24-filled';


export const Charts = (headObj, clickFunc, filter, clearFilter) => {
  const { ratings, recommended, characteristics } = headObj;

  const starLevels = ['1 stars', '2 stars', '3 stars', '4 stars', '5 stars'];
  const qualFit = ['Runs tight', 'Perfect', 'Runs long'];
  const qualLen = ['Short', 'Perfect', 'Long'];
  const qualCom = ['Uncomfortable', 'Ok', 'Perfect'];
  const qualQua = ['Poor', 'Expected', 'Perfect'];
  const qualWid = ['Narrow', 'Perfect', 'Wide'];
  const qualSize = ['Too Small', 'Perfect', 'Too Large'];
  const barStats = [];
  // eslint-disable-next-line guard-for-in

  let filterCheck;
  let filterVals = [];

  if (filter.indexOf(true) === -1) {
    filterCheck = false;
  } else {
    filterCheck = true;
    for (let i = 0; i < filter.length; i += 1) {
      if (filter[i]) {
        if (filterVals.length === 0) {
          filterVals[i] = (<div className="filterIndicator">  {i + 1} star</div>);
        } else {
          filterVals[i] = (<Fragment><div className="filterSpacer"> </div><div className="filterIndicator"> {i + 1} star</div></Fragment>);
        }
      }
    }
  }

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
    const temp = {};
    if (Number(ratings[i])) {
      temp.percent = (Number(ratings[i]) / voteCount) * 100;
    } else if (!Number(ratings[i])) {
      temp.percent = 0;
    }
    temp.starLev = starLevels[i - 1];
    temp.count = Number(ratings[i]) || 0;
    temp.val = i - 1;
    barStats.push(temp);
  }
  const rPercent = Math.round((Number(recommended[Object.keys(recommended)[0]]) / Number(voteCount)) * 100);

  const charMap = Object.keys(headObj.characteristics);

  return (
    <div>
      <table className="dataTable">
        <tbody>
          <tr className="percentageRow">
            <td>
              <div className="starLev">{`${rPercent}% of reviews recommend this product`}</div>
            </td>
          </tr>
          {filterCheck ? (
            <tr className="percentageRow">
              <td>
                <div>Filtered by:{filterVals}
                </div>
              </td>
            </tr>
          ) : null}
          {filterCheck ? (
            <tr className="centeredRow pointer">
              <td>
                <div onClick={() => { clearFilter() }}>
                  <div className="cancelFilter">Remove all filters </div>
                  <div className="cancelFilterIcon"><Icon icon={dismissCircle24Filled} /></div>
                </div>
              </td>
            </tr>
          ) : null}
          {barStats.map((percentage) => (
            <tr
              key={headObj.product_id.concat(percentage.starLev)}
              value={percentage.starLev}
              onClick={() => {
                clickFunc(percentage.val);
              }}
            >
              <td>
                <div className="dataRow">
                  <div className="starLev">{percentage.starLev}</div>
                  <div className="ratingBar">
                    <div className="dataBar voted" style={{ width: `${percentage.percent}%` }} />
                    <div className="dataBar difference" style={{ width: `${100 - percentage.percent}%` }} />
                  </div>
                  <div className="ratingCount">{percentage.count}</div>
                </div>
              </td>
            </tr>
          ))}
          {charMap.map((quality) => {
            let quaArray = [];
            if (quality === 'Fit') {
              quaArray = qualFit;
            } else if (quality === 'Length') {
              quaArray = qualLen;
            } else if (quality === 'Comfort') {
              quaArray = qualCom;
            } else if (quality === 'Quality') {
              quaArray = qualQua;
            } else if (quality === 'Width') {
              quaArray = qualWid;
            } else if (quality === 'Size') {
              quaArray = qualSize;
            }
            return (
              <tr className="qualityRow" key={headObj.characteristics[quality].value}>
                <td>
                  <div className="qualityHolder">
                    <div className="quality">{quality}</div>
                    <div className="fullQBar">
                      <div className="qualityBar">
                        {'\n'}
                        {quaArray[0]}
                      </div>
                      <div className="qualityBar spacer" />
                      <div className="qualityBar">
                        {'\n'}
                        {quaArray[1]}
                      </div>
                      <div className="qualityBar spacer" />
                      <div className="qualityBar">
                        {'\n'}
                        {quaArray[2]}
                      </div>
                    </div>
                    <div className="qualityArrow" style={{ width: `${headObj.characteristics[quality].value * 20}% ` }}>&#9660;</div>
                  </div>
                </td>
              </tr>
            );
          })}
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
