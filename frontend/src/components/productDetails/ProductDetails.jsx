import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProductDetails,clearErrors, newReview } from '../../actions/productAction'
import { useEffect } from 'react'
import './productDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import Loader from '../layout/loading/Loader'
import {useAlert} from 'react-alert'
import MetData from '../layout/MetData'
import { addItemsToCart } from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = () => {

  let params = useParams();
  
    const alert=useAlert()


    const dispatch=useDispatch()
 
    const {product,loading,error}=useSelector(state=>state.productDetails)
    const {success,error:reviewError}=useSelector(state=>state.newReview)
    const [rating ,setRating]=useState()
    const [open ,setOpen]=useState(false)
    const [comment,setComment]=useState("")

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(reviewError){
        alert.error(reviewError)
        dispatch(clearErrors())
      }

      if (success) {
        alert.success("review submit successFully kindly refresh first")
        dispatch({type:NEW_REVIEW_RESET})
      }
   dispatch(getProductDetails(params.id))
    }, [dispatch,params.id,error,alert,success,reviewError])

 
   
    const options={

      size:"large",
      value:product.ratings,
      readOnly:true,
      precision:0.5,
  }
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle= ()=>{
    open ? setOpen(false) : setOpen(true);
  }
  const reviewSubmitHandler= ()=>{
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm))

    setOpen(false)
  }

  return (
<>
{loading ? <Loader/> :(
  <>
  <MetData  title={`${product.name} --Ecommerice`}/>
  <div className='product-details'>
    <div className='img-container'>
        <Carousel>
        {product.images &&
       product.images.map((item, i) => (
         <img
           className="CarouselImage"
           key={i}
           src={item.url}
           alt={`${i} Slide`}
         />
       ))}
       </Carousel>
  
     
    </div>
    <div className='detailBlock'>
      <div className='detailBlock-1'>
        <h2>{product.name}</h2>
        <p>Product # {product._id}</p>
      </div>
      <div className='detailsBlock-2'>
      <Rating {...options}/>
      <span style={{color:"tomato"}}>({product.numberOfReviews} Reviews)</span>
      </div>
      <div className='detailsBlock-3'>
     <h1>{`$${product.price}`}</h1>
     <div className='detailsBlock-3-1'>
      <div className='detailsBlock-3-1-1'>
      <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
 
      </div>
      <button disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler} >
                    Add to Cart
      </button>
     </div>
     <p>
       status: 
       <b className={product.stock <1 ? "redColor" :"greenColor"}>
         {product.stock<1 ? "OutOfStock":"InStock"}
       </b>
     </p>
      </div>
      <div className='detailsBlock-4'>
        Discription:<p>{product.description}</p>
      </div>
      <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
    </div>
  </div>
  {/* for the product reviews agr review haa toh ak div show krvai or us mA KAHA K AGR REVIEW HAA TOH USPER MAPFUNCTION CHALA DIYA */}
 
   <h3 className='reviewsHeading'>REVIEWS</h3>


   <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
  {
   product.reviews && product.reviews[0] ? (
    <div className='reviews'>
      {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
    </div>
 
   ) :(
      <p className='noReviews'>No Reviews yet</p>
   )
 
  }
     </>
)}
</>
  )
}

export default ProductDetails