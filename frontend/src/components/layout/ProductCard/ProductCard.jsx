import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";

import './productCard.css'
import Footer from '../Footer/Footer'
import { Tilt } from 'react-tilt'

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}


const ProductCard = ({product}) => {
  
  const options={
    size:"large",
    value:product.ratings,
    readOnly:true,
    precision:0.5,
  } 
  return (

    <>
    <Tilt options={defaultOptions}>
    <Link to={`/product/${product._id}`} >
    <div className='product' >
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
    </Tilt>
    {/* <div className='footer'>
    <Footer/> 
    </div> */}
    </>
  )
}

export default ProductCard