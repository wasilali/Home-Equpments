import React,{useState,useEffect} from 'react'
import './forgotPassword.css'
import Loader from '../layout/loading/Loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,forgotPassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom'
import MetData from '../layout/MetData'

const ForgotPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()
    const {error,message,loading}=useSelector((state)=>state.forgotPassword)

    const [email,setEmail]=useState("")

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.set("email",email)
       dispatch(forgotPassword(myForm))

    }
    useEffect(() => {
        
      if(error){
        alert.error(error)
        dispatch(clearErrors())
        
      }
      if(message){
        alert.success("Email send successfully...")
    }
    }, [dispatch,error,alert,message])
    
  return (
    <>
    {loading ? <Loader/> :  (
         <>
         <MetData title="Forgot Password "/>
          <div className='forgotPasswordContainer'>
           <div className='forgotPasswordBox'>
       
             <h2 className='forgotPasswordHeading' >Forgot Password</h2>
           <form
            className="forgotPasswordForm form"
            onSubmit={forgotPasswordSubmit}
            >
        
          <div className='emailName'>
            <div className='forgotPasswordEmail'>
             <MailOutlineIcon/>
             <input type="email" 
             className=' form-control'
             style={{width:"100%",margin:"1rem 0"}}
             placeholder='Email'
             required
             name="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             />
            </div>
            <div>
            <input type="submit" 
            value="send"
            className="forgotPasswordBtn"
            /> 
            </div>
          </div>
        </form>
       </div>
      </div>
    </>
    )}
    </>
  )
}

export default ForgotPassword