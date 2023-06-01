import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";

import './productCard.css'
import Footer from '../Footer/Footer'
const ProductCard = ({product}) => {
  const options={
    size:"large",
    value:product.ratings,
    readOnly:true,
    precision:0.5,
  } 
  return (

    <>
    <Link to={`/product/${product._id}`} >
    <div className='product mt-5' >
    <div class="wrapper" >
      <div class="card front-face">
        <img src={product.images[0].url}/>
      </div>
      <div class="card back-face">
        <img src={product.images[0].url}/>
        <div class="info">
          <div class="title neon_product">{product.name}</div>
          <p className=' text-[tomato]'>{product.discription}</p>
        </div>
       <div>
           <Rating {...options}/>
            <span className=' text-[yellow]'>({product.numberOfReviews} reviews)</span>
       </div>
       <span className=' text-[tomato]'>{`$${product.price}`}</span>
      </div>
    </div>
    </div>
    </Link>
    {/* <div className='footer'>
    <Footer/> 
    </div> */}
    </>
  )
}

export default ProductCard