import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './Home.css'
import {BiMouseAlt} from 'react-icons/bi'
import MetData from '../MetData'
import { useEffect } from 'react'
import {getProduct,clearErrors} from '../../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../loading/Loader'
import { useAlert } from 'react-alert'

const Home = () => {
  const alert=useAlert()
  const dispatch=useDispatch()
  const {loading,error,products}=useSelector(state=>state.products)
  const {user,isAuthenticated}=useSelector(sta=>sta.user)
  useEffect(() => {
    if(error){
    alert.error(error)
      dispatch(clearErrors())
    }
   dispatch(getProduct())
  }, [dispatch,error,alert])
  


  
  return (
<>
{
  loading ? <Loader/>:     <>
  <MetData title="Ecommerice"/>
  <div className='home'>
    {
      isAuthenticated?(<h2 className='t1'><span>W</span>ellcome <span>{user && user.name}</span></h2>):
      (<h2 className='t1'><span>Please</span> Login <span>For better Exprience</span></h2>)
    }
  
  <div class="text2m">
<div class="wrapper">
  <div class="static-txt robo">You can buy what you want</div>
  <ul class="dynamic-txts">
    <li><span>Home...</span></li>
    <li className=' -ml-5'><span>Equipments...</span></li>
    <li><span>Home...</span></li>
    <li className=' -ml-5'><span>Equipments...</span></li>
  </ul>
</div>
</div>

<h2 className='neon h2' id='ss1' data-text="Find Amazing Products Below">Find Amazing Products Below</h2>
<a id='scroll' href="#ss" className=' flex '>Scroll <span className=' mt-1 ml-2'><BiMouseAlt/></span></a>
 <h2 id='ss' className='neon featured h2'>Featured Products </h2>
 
  </div>
  <div  className='homeproduct'>
    {products && products.map(product=>(
       <ProductCard product={product}/>
    ))}
  </div>
 
  </>
}
</>
  )
};

export default Home