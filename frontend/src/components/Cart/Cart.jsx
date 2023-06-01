import React, { Fragment } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import CartItemsCard from "./CartItemsCard";
import { addItemsToCart,removeItemsToCart } from "../../actions/cartAction";

const Cart = () => {
  const nav=useNavigate()
  const dispatch = useDispatch();
 const { cartItems } = useSelector((state) => state.cart);
 const {loading,isAuthenticated,user}=useSelector(state=>state.user)
 console.log(cartItems);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id,newQty))
    
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id,newQty))
  };

  const delCardItems= (id)=>{
    dispatch(removeItemsToCart(id))
  }
const chackout=()=>{
    nav("/shipping")
}

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <h1 style={{ color:"white" }}>No Product in Your Cart</h1>
          <Link to="/products" className="btn">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems
            &&cartItems.map((item)=>(
                    <div className="cartContainer" key={item.product}>
                    <CartItemsCard item={item} delCardItems={delCardItems}  />
                    <div className="cartInput">
                      <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{
                        `$${item.quantity*item.price}`
                    }</p>
                  </div>
                ))
            }

               


            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p className="para">Gross Total</p>
                <p className="para">{
                  `$${cartItems.reduce(
                    (acc,item)=> acc + item.quantity * item.price,
                    0
                  )}`
                  }</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={chackout}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;