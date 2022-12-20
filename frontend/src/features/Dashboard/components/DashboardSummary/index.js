import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const CARD_COLORS = ['#6777ef', '#ffa426', '#fc544b', '#47c363'];

function Summary(props) {
  return (
    <div className="summary-container">
      {props?.summary?.map((item, index) => (
        <div key={index} className="col">
          <div className="card">
            <div
              style={{ backgroundColor: CARD_COLORS[Math.floor(index / 4)] }}
              className="item-icon-cont"
            >
              <div className="icon">{item.icon}</div>
            </div>
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-value">
                {item.currency}
                {item.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Summary.propTypes = {
  summary: PropTypes.array,
};

export default Summary;
