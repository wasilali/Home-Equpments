import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Header/Navbar';
import ProductDetails from './components/productDetails/ProductDetails';
import Products from './components/Products/Products';
import Search from './components/Products/Search.jsx'
import './App.css'
import LoginSignup from './components/User/LoginSignup';
import store from "./store"
import { loardUser } from './actions/userAction';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProctedRout from './components/ProctedRout/ProctedRout';
import Loader from './components/layout/loading/Loader';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import RestetPass from './components/User/RestetPass';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConform from './components/Cart/OrderConform';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import SuccessOrder from './components/Cart/SuccessOrder';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrders from './components/admin/UpdateOrders';
import UsersList from './components/admin/UsersList';
import UpdateUserRole from './components/admin/UpdateUserRole';
import ProductReviews from './components/admin/ProductReviews';
import Footer from './components/layout/Footer/Footer';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import UserOptions from './components/layout/Header/UserOptions';

function App() {

  const {loading,isAuthenticated,user}=useSelector(state=>state.user)

  const[stripeapikey,setStripeapikey]=useState("")

  async function getStripeApiKey() {
    const {data} = await axios.get('/api/v1/stripeapikey')
    setStripeapikey(data.stripeApiKey);
  }

  useEffect(()=>{
    if (user !==null) {
    store.dispatch(loardUser())
      
    }
    
    getStripeApiKey()

  },[])
  return (
    <>
    {loading?<Loader/>:(
    <>
    <BrowserRouter>
    <Navbar/>
    {isAuthenticated&&<UserOptions user={user}/>}
    <Routes>
    <Route element={<ProctedRout isAunthenticated={isAuthenticated}/>}>


<Route path='/account' element={<Profile/>}/>
<Route path='/me/update' element={<UpdateProfile/> }/>
<Route path='/password/update' element={<UpdatePassword/>}/>
<Route path='/shipping' element={<Shipping/>} />
<Route path='/order/confirm'element={<OrderConform/>}></Route>
<Route path='/process/payment' element={stripeapikey&&
(<Elements stripe={loadStripe(stripeapikey)}><Payment/></Elements>)} />
<Route path='/success'element={<SuccessOrder/>}></Route>
<Route path='/orders'element={<MyOrders/>}></Route>
<Route path='/order/:id'element={<OrderDetails/>}></Route>


</Route>
<Route element={<ProctedRout isAdmin={true} isAunthenticated={isAuthenticated}/>}>


<Route path='/admin/dashboard'element={<Dashboard/>}></Route>

<Route path='/admin/products'element={<ProductList/>}></Route>

<Route path='/admin/product'element={<NewProduct/>}></Route>

<Route path='/admin/product/:id'element={<UpdateProduct/>}></Route>

<Route path='/admin/orders'element={<OrderList/>}></Route>

<Route path='/admin/order/:id'element={<UpdateOrders/>}></Route>
/admin/user/
<Route path='/admin/users'element={<UsersList/>}></Route>

<Route path='/admin/user/:id'element={<UpdateUserRole/>}></Route>

<Route path='/admin/reviews'element={<ProductReviews/>}></Route>

</Route>
<Route path='/' element={<Home/>} />
<Route path='/products' element={<Products/>}/>
<Route path='/product/:id' element={<ProductDetails/>}/>
{/* usefor searching */}
{/*  */}
      <Route path='/products/:keyword' element={<Products/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/login' element={ <LoginSignup/> }/>
      <Route path='/password/forgot' element={ <ForgotPassword/> }/>
      <Route path='/password/reset/:token' element={ <RestetPass/> } />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route>

      <Route element={<About/>}></Route>

      
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    </>
    )}
  </>
  );
}

export default App;
