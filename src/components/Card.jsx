import React from "react";
import "../styles/Card.css";

const Card = ({
  borderClass,
  textClass,
  title,
  value,
  iconClass,
  iconColor,
}) => {
  return (
    <div className={`card ${borderClass} shadow h-100 py-2`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div
              className={`text-xs font-weight-bold ${textClass} text-uppercase mb-1`}
            >
              {title}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {value}
            </div>
          </div>
          <div className="col-auto">
            <i className={`${iconClass} fa-2x ${iconColor}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
