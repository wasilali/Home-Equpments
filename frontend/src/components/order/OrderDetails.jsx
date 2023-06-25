import React, { useEffect } from 'react'
import './OrderDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { orderDetails,clearErrors } from '../../actions/orderAction'
import Loader from '../layout/loading/Loader';
import MetData from '../layout/MetData';

// import { clearErrors } from '../../actions/productAction'

const OrderDetails = () => {
  const dispatch=useDispatch()
  const params = useParams();
  const {loading,order,error}= useSelector(set=>set.orderDetails)

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(orderDetails(params.id))
  },[])
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetData title="Order Details" />
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <h1>
              Order #{order && order._id}
            </h1>
            <p className=' text-[tomato]'>Shipping Info</p>
            <div className="orderDetailsContainerBox">
              <div>
                <p className=' text-white'>Name:</p>
                <span className=' text-white'>{order.user && order.user.name}</span>
              </div>
              <div>
                <p className=' text-white'>Phone:</p>
                <span className=' text-white'>
                  {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                <p className=' text-[tomato]'>Address:</p>
                <span className=' text-white'>
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <p className=' text-[tomato]'>Payment</p>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p className=' text-[tomato]'>Amount:</p>
                <span className=' text-white'>{order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <p className=' text-[tomato]'>Order Status</p>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <p className=' text-[tomato]'>Order Items:</p>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`} className=' text-white'>
                      {item.name}
                    </Link>{" "}
                    <span className=' text-white'>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default OrderDetails