
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { p } from "@material-ui/core";
import MetData from "../layout/MetData";
import CheckoutSteps from "./ChackoutSteps";
const OrderConform = () => {
  const nav=useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 100 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    nav("/process/payment");
  };

  return (
    <Fragment>
      <MetData title="Confirm Order" />
      <CheckoutSteps activeStep={1}/>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <p>Shipping Info</p>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <p>Your Cart Items:</p>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <p>Order Summery</p>
            <div>
              <div>
                <p className=" text-[tomato]">Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p className=" text-[tomato]">Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p className=" text-[tomato]">GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b className=" text-[tomato]">Total:</b>
              </p>
              <span className=" text-[white]">₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderConform;