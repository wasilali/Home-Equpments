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
  <div className='home h-screen'>
    {
      isAuthenticated?(<h2 className='t1 mb-[5rem]'><span>W</span>elcome <span>{user && user.name}</span></h2>):
      (<h2 className='t1 mb-[5rem]'><span>W</span>elcome <span>to Our Store</span> please <span>Login</span></h2>)
    }
  <div>
  <div class="robo mt-5 md:mt-[8rem] flex justify-center text-center items-center sm:text-3xl px-6">Discover the best home equipment and enjoy an amazing shopping experience
  </div>
  </div>
  <div class="text2m -mt-2">
<div class="wrapper">
  <ul class="dynamic-txts">
    <li><span>Home . . .</span></li>
    <li className=' -ml-10 text-[yellow]'><span className='text-[yellow]'>Equipments . . .</span></li>
    <li><span>Home . . .</span></li>
    <li className=' -ml-10 text-[yellow]'><span className='text-[yellow]'>Equipments . . .</span></li>
  </ul>
</div>
</div>

<h2 className='neon h2' id='ss1' data-text="Find Amazing Products Below">Find Amazing Products Below</h2>
<a id='scroll' href="#ss" className=' flex '>Scroll <span className=' mt-1 ml-2'><BiMouseAlt/></span></a>
 
  </div>
 <h2 id='ss' className='neon featured h2'>Featured Products </h2>
  <div  className=' md:mt-10 px-5 xl:px-12 grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-3'>
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