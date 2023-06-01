import React from "react";
import "./CartItemsCard.css";
import { Link } from "react-router-dom";

const CartItemsCard = ({ item, delCardItems }) => {

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={()=>delCardItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemsCard;