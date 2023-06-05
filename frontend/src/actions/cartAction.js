import axios from "axios";
import { ADD_TO_CART,
    REMOVE_CART_ITEMDS,
    SAVE_SHIPPING_INFO,
    } from "../constants/cartConstant";

    //add to card
export const addItemsToCart =(id,quantity)=>async(dispatch,getstate)=>{
    const { data }=await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity,
        }
    });
localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItems))

}
export const addItemsToWishList =(id,quantity)=>async(dispatch,getstate)=>{
    const { data }=await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type:"ADD_TO_WISH_LIST",
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity,
        }
    });
localStorage.setItem("wishList",JSON.stringify(getstate().wish.wishItems))

}
//remove items,...
export const removeItemsToCart =(id)=>async(dispatch,getstate)=>{
    dispatch({
        type:REMOVE_CART_ITEMDS,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItems))
}

export const removeWishToCart =(id)=>async(dispatch,getstate)=>{
    dispatch({
        type:"REMOVE_WISH_ITEMDS",
        payload:id,
    });
    localStorage.setItem("wishList",JSON.stringify(getstate().wish.wishItems))
}
//save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data))
  };
