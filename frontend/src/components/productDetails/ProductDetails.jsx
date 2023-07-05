import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProductDetails,clearErrors, newReview } from '../../actions/productAction'
import { useEffect } from 'react'
import './productDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Loader from '../layout/loading/Loader'
import {useAlert} from 'react-alert'
import MetData from '../layout/MetData'
import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@material-ui/core/styles';
import { addItemsToCart, addItemsToWishList, removeWishToCart } from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { createReport } from '../../actions/reportAction'
import { CREATE_REPORT_RESET } from '../../constants/reportConstant'

const ProductDetails = () => {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  let params = useParams();
  
    const alert=useAlert()


    const dispatch=useDispatch()
 
    const {product,loading,error}=useSelector(state=>state.productDetails)
    const {success,error:reviewError}=useSelector(state=>state.newReview)
    const { wishItems }=useSelector(state=>state.wish)
    const {error:reportError,message,loading:reportLoading}=useSelector(state=>state.report)
  //  const isChackedItems= cartItems&&cartItems.map((i)=>(i.product===params.id))

    const [rating ,setRating]=useState()
    const [open ,setOpen]=useState(false)
    const [comment,setComment]=useState("")
    const [isClicked, setIsClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
  };
const handleRating=(e)=>{
  const newComment = e.target.value;

  if (newComment.length <= 100) {
    setComment(newComment);
  } else {
    setComment(newComment.slice(0, 100)); // Truncate comment to the first 100 characters
  }

}
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleReport = (e) => {
    e.preventDefault()
    // Handle report submission here
    const report = {
      product:params.id,
      reason:reportReason,
      description:reportDescription
    }
    console.log(report);
    dispatch(createReport(report))
    handleClose();
  };
    const item = wishItems.find(i => i.product === params.id);

    useEffect(()=>{
      if (item) {
        setIsClicked(true)
      }else{
        setIsClicked(false)
      }
    },[wishItems])

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(reviewError){
        alert.error(reviewError)
        dispatch(clearErrors())
      }
      if(reportError){
        alert.error(reportError)
        dispatch(clearErrors())
      }
      if (message) {
        alert.success(message)
        dispatch({type:CREATE_REPORT_RESET})
      }
      if (success) {
        alert.success("review submit successFully kindly refresh first")
        dispatch({type:NEW_REVIEW_RESET})
      }
   dispatch(getProductDetails(params.id))
    }, [dispatch,params.id,error,alert,success,reviewError,message,reportError])

 
   
    const options={
      size:"large",
      value:product&&product.ratings,
      readOnly:true,
      precision:0.5,
  }
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    if(isClicked){
      dispatch(removeWishToCart(params.id))
      alert.success("Item remove from wish list");
    }else{
      dispatch(addItemsToWishList(params.id, quantity));
      alert.success("Item Added To wish list");
    }


  };

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
{loading || reportLoading ? <Loader/> :(
  <>
  <MetData  title={`${product.name} --Ecommerice`}/>
  <div className='product-details'>
    <div className='img-container '>
        <Carousel>
        {product.images &&
       product.images.map((item, i) => (
         <img
           className="w-full object-cover rounded-xl
           transition-all"
           key={i}
           src={item.url}
           alt={`${i} Slide`}
         />
       ))}
       </Carousel>
  
     
    </div>
    <div className='detailBlock'>
      <div className='flex justify-between items-center w-[70%]'>
      <div className='detailBlock-1'>
        <h2>{product.name}</h2>
        <p>Product # {product._id}</p>
      </div>
      <div className='flex'>
    
      <IconButton onClick={handleClick}>
      {isClicked ? ( <>
        <BootstrapTooltip title="remove to wish list">
        <Favorite style={{ color: 'red' }} />
        </BootstrapTooltip>  
      </>
      ) : (
        <>
        <BootstrapTooltip title="wish list">
        <Favorite style={{ color: 'white' }} />
        </BootstrapTooltip>
        </>
      )}
    </IconButton>
    
      </div>
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
        Discription:
      </div>
      <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
      <div className='detailsBlock-4'>
        Report this Product?
      </div>
      <button className='submitReview' onClick={handleOpen}> Report Box</button>
    </div>
  </div>
  {/* for the product reviews agr review haa toh ak div show krvai or us mA KAHA K AGR REVIEW HAA TOH USPER MAPFUNCTION CHALA DIYA */}
 
   <h3 className='reviewsHeading'>REVIEWS</h3>


   <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle >Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col">
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={handleRating}
              ></textarea>
              <span className='flex justify-end'>{comment.length}/100</span>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                style={{margin:"2rem 0 0 0",justifyContent:"center",alignItems:"center",textAlign:"center"}}
              />

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
    <Dialog open={isOpen} onClose={handleClose} className="">
        <DialogTitle>Report</DialogTitle>
        <DialogContent>
          <div className="mb-4 w-[400px]">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="report-reason">
              Report Reason:
            </label>
            <select
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              id="report-reason"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate Content</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4 w-[400px]">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="report-description">
              Report Description:
            </label>
            <textarea
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              id="report-description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>Cancel</Button>
          <Button onClick={handleReport} disabled={!reportReason || !reportDescription} autoFocus color='primary'>
            Submit Report
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