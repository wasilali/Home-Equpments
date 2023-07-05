import React from 'react'
import { addItemsToCart, removeWishToCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@material-ui/core/styles';

const WishItems = ({w}) => {
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
    const dispatch=useDispatch()
    const alert=useAlert();
    const addToCartHandler = () => {
        dispatch(addItemsToCart(w.product, w.quantity));
        alert.success("Item Added To Cart");
      };
      const handleClick = () => {
          dispatch(removeWishToCart(w.product))
          alert.success("Item remove from wish list");
        };
  return (
    <li key={w.product} className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[yellow]">
      <img
        src={w.image}
        alt={w.name}
        className="h-full w-full object-cover object-center"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <Link className=' text-[orange] hover:text-[yellow]' to={`/product/`+ w.product}>{w.name}</Link>
          </h3>
          <p className="ml-4  text-white">{w.price}</p>
        </div>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">

        <div className="flex">
        <BootstrapTooltip title="add to cart">
        <button className="flex items-center text-[tomato] hover:text-[yellow]" onClick={addToCartHandler}>
<svg
xmlns="http://www.w3.org/2000/svg"
className="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
/>
</svg>
        </button>

        </BootstrapTooltip>
        <BootstrapTooltip title="remove to wish list">
        <IconButton aria-label="delete" color="danger" onClick={handleClick}>
        <DeleteIcon style={{color:"white"}} />
        </IconButton>

        </BootstrapTooltip>
        </div>
      </div>
    </div>
  </li>
  )
}

export default WishItems