import React,{useState} from 'react'
import './UserOptions.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExistToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import {useDispatch, useSelector} from 'react-redux'
import Backdrop from "@material-ui/core/Backdrop"
import { FaSearch } from 'react-icons/fa'
const UserOptions = ({user}) => {
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false)
    const navigate=useNavigate()
    const alert=useAlert
    const dispatch=useDispatch()

    const options=[
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ShoppingCartIcon style={{color:cartItems.length?"tomato":"yellow"}} /> ,name:"Cart("+cartItems.length+")",func:shopping},
        {icon:<ExistToAppIcon/>,name:"Logout",func:logoutUser},
   
    ]
    if(user.role==="admin"){
        options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
    }
    function shopping() {
        navigate("/cart")
    }
    function dashboard() {
        navigate("/admin/dashboard")
    }
    function orders() {
        navigate("/orders")    
    }
    function account() {
        navigate("/account")
        
    }
    function logoutUser() {
       dispatch(logout())
       alert.success("logout Successfully")
    }
    
  return (
    <>
    <Backdrop open={ open }  />
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=> setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction="up"
    className='speedDial'
    style={{zIndex:"11"}}
    icon={<img 
    className='speedDialIcon'
    src={user.avatar ?  user.avatar.url : ""}
    alt="profile"
    />}
    >
   {
    options.map((item)=>(
        <SpeedDialAction key={item.name}
         icon={item.icon}
          tooltipTitle={item.name}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
          onClick={item.func}/>
    ))
   }

    </SpeedDial>
    </>
  )
}

export default UserOptions