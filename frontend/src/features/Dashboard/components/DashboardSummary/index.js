import React from 'react';
import './style.scss';

const CARD_COLORS = ["#6777ef", "#ffa426", "#fc544b", "#47c363"];

const Summary = (props) => {
  return (
    <div className="summary-container">
      {props?.summary?.map((item, index) => {
        return (
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
                <div className="item-value">{item.currency}{item.value}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Summary;
