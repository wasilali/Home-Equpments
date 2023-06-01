import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./SuccessOrder.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
const SuccessOrder = () => {
  const {user}= useSelector(state=>state.user)
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <p className="back">MR, <span className="text-[yellow]">{user.name}</span> Your Order has been Placed successfully </p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default SuccessOrder;