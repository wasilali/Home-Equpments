import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, delProductReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer'
import { allUserReducer, forgotPassReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer, wishReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { deleteReportReducer, reportReducer } from "./reducers/reportReducer";

const reducer=combineReducers({
products:productsReducer,
productDetails:productDetailsReducer,
user:userReducer,
profile:profileReducer,
forgotPassword:forgotPassReducer,
cart:cartReducer,
wish:wishReducer,
newOrder:newOrderReducer,
myOrders:myOrderReducer,
orderDetails:orderDetailsReducer,
newReview:newReviewReducer,
newProduct:newProductReducer,
product:delProductReducer,
allOrders:allOrderReducer,
order:orderReducer,
allUsers:allUserReducer,
userDetails:userDetailsReducer,
productReviews:productReviewsReducer,
review:reviewReducer,
report:reportReducer,
deleteReport:deleteReportReducer,
});
let initialState= {
    cart:{
        cartItems: localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):
        [],
        shippingInfo:localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
    wish:{
        wishItems: localStorage.getItem("wishList")?
        JSON.parse(localStorage.getItem("wishList")):
        [],
    },

};

const middleware= [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;


// import { createStore ,combineReducers,applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { productReducer,productDetailsReducer } from './reducers/productReducer'


// const reducer=combineReducers({
// products:productReducer,
// productDetails:productDetailsReducer
// })
// let initialState={}
// const middleware=[thunk]
// const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

// export default store