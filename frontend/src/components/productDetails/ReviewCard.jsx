import React from 'react'
import { Rating } from "@material-ui/lab";
import profilepng from '../../images/profileImg.png'

const ReviewCard = ({review}) => {
  console.log("review",review);
    const options={
      value:review.rating,
      readOnly:true,
      precision:0.5,
    }

  
  return (
    <>
    <div className='reviewCard'>
      {
        review.image?
        <img className=' rounded-[50%]' src={review.image} alt="preview" />:
        <img className='' src={profilepng} alt="preview" />
      }
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
    </>
  )
}

export default ReviewCard