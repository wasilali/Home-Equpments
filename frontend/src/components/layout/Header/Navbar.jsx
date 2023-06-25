import React, { useState } from 'react'
import {FaBars, FaTimes , FaHome,FaProductHunt} from 'react-icons/fa'
import ExistToAppIcon from '@material-ui/icons/ExitToApp'
import { useRef } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {IoMdContact} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction'
import { useAlert } from 'react-alert'
import { IconButton } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'

import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@material-ui/core/styles';
import WishList from '../../Cart/WishList'
const Navbar = () => {
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
  const navRef=useRef();
  const dispatch=useDispatch();
  const alert=useAlert();
  const showNavbar=()=>{
    navRef.current.classList.toggle("responsive_nav")
  };
  const {isAuthenticated,user}=useSelector(state=>state.user);
  const {wishItems}=useSelector(state=>state.wish);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false)

  function logoutUser() {
    
    dispatch(logout())
    alert.success("logout Successfully...")
   
     
 }

  return (
    
    <>
        {/* navbar */}
        <nav className=" hidden lg:flex justify-between border-b-2 border-[tomato] text-white w-full">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <Link className="text-3xl font-bold font-heading hover:text-[yellow] robo" to="/">
              Home Equipments
            </Link>
            {/* Nav Links */}
            <ul
              className={`${
                isMenuOpen ? 'flex' : 'hidden'
              } md:flex px-4 mx-auto font-semibold font-heading space-x-12`}
            >
              <li>
                <Link className="hover:text-[yellow]" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-[yellow]" to="/products">
                Equipments
                </Link>
              </li>
              <li>
                <Link className="hover:text-[yellow]" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-[yellow]" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex items-center space-x-5">
            <IconButton>
        <BootstrapTooltip title="wish list">
        <Favorite style={{ color: 'red' }} onClick={()=>{
          setOpen(!open)
        }} />
        
        </BootstrapTooltip>
    </IconButton>
    <span className=' absolute text-[0.8rem] text-[yellow] px-3 -mt-6'>(<span className='text-[tomato] p-[2px]'>{wishItems&&wishItems.length}</span>)</span>
              {/* <Link className="hover:text-[yellow]" to="/search">
              <svg
              xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mt-[4px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M10 17.5l-3.5-3.5m0 0a5 5 0 113.5-8.5 5 5 0 01-3.5 8.5z"
  />
</svg>
              </Link> */}
              <Link className="flex items-center hover:text-[yellow]" to="/cart">
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
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
              </Link>
              {/* Sign In / Register */}
              {
                isAuthenticated?(
                 <div onClick={logoutUser}>
                  <ExistToAppIcon/>
                 </div> 
                ):(
<Link className="flex items-center hover:text-gray-200" to="/login">
                <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 hover:text-gray-200"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path d="M12 6v4m0 0v4m0-4h4m-4 0H8" />
  </g>
</svg>

              </Link>
                )
              }
              
            </div>
          </div>
        </nav>
   <header className=' lg:hidden'>
    <h3 className='text-xl font-[500] font-heading robo'>Home Equipments</h3>
     
     <nav ref={navRef} className='border-b-2 border-[tomato]'>
       <Link className="hover:text-[yellow]" onClick={showNavbar} to="/">Home</Link>
       <Link className="hover:text-[yellow]" onClick={showNavbar} to="/products">Equipments</Link>
       <Link className="hover:text-[yellow]" onClick={showNavbar} to="/contact">Contact</Link>
       <Link className="hover:text-[yellow]" onClick={showNavbar} to="/about">About</Link>
       <button className='nav-btn nav-close-btn' onClick={showNavbar}>
         <FaTimes/>
       </button>
     <Link onClick={showNavbar} className='navSerch' to="/login">{isAuthenticated?<img style={{height:"30px",width:"30px",borderRadius:"50%",marginTop:"-0.3rem" }} src={user.avatar ?  user.avatar.url : ""} alt="gfd" />:<IoMdContact/>}</Link>
     {/* <Link onClick={showNavbar} className='navLogin' to="/search"><FaSearch/></Link> */}
    <div onClick={showNavbar} className='navLogin'><IconButton>
        <BootstrapTooltip title="wish list">
        <Favorite style={{ color: 'white' }} onClick={()=>{
          setOpen(!open)
        }} />
        </BootstrapTooltip>
    </IconButton>
    <span className=' absolute text-[0.8rem] text-[yellow] -ml-4'>(<span className='text-[tomato] p-[2px]'>{wishItems&&wishItems.length}</span>)</span>
      </div> 
     
     </nav>
     <button className='nav-btn' onClick={showNavbar}>
       <FaBars/>  
     </button>
   </header>
   <WishList setOpen={setOpen} open={open} />
    </>
  )
}

export default Navbar