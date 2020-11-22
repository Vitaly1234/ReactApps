import React from "react";
import s from "./item-details.module.scss";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className={s.term}>{label} </span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };

const ItemDetails = (props) => {
  const { item, image, children } = props;

  return (
    <div className={`${s["item-details"]} card`}>
      <img src={image} alt="item" className={s["item-image"]} />
      <div className="card-body">
        <h4>{item.name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    </div>
  );
};

export default ItemDetails;
