import React,{useRef,useState,useEffect} from 'react'
import './LoginSignup.css'
import Loader from '../layout/loading/Loader'
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import  { useDispatch,useSelector } from "react-redux"
import { login,clearErrors,register } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { useNavigate } from 'react-router-dom'
import profilepng from '../../images/profileImg.png'
const LoginSignup = () => {
    const dispatch=useDispatch()
    const alert=useAlert()
    const nav= useNavigate()
const {error,loading,isAuthenticated}=useSelector(state=>state.user)
    const loginTab=useRef(null)
    const registerTab=useRef(null)
    const switcherTab=useRef(null)

    const [loginEmail,setLoginEmail]=useState("")
    const [loginPassword,setLoginPassword]=useState("")

// for register
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    })
    const {name,email,password,password2}=user
    console.log(password,password,password2);
    const [avatar,setAvatar]=useState()
    const [avatarPreview,setAvatarPreview]=useState(profilepng)

    const loginSubmit=(e)=>{
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword))
        if(isAuthenticated===true){
        nav("/")
        }
    }


    const registerSubmit=(e)=>{
        e.preventDefault()
        if (password===password2) {
            
        
        const myForm=new FormData()
        myForm.set("name",name)
        myForm.set("email",email)
        myForm.set("password",password)
        myForm.set("avatar",avatar)
        dispatch(register(myForm))
        if(isAuthenticated===true){
            nav("/")
            }

        }else{
            alert.error("password not match")
        }
    }
const registerDataChange=(e)=>{
if(e.target.name==="avatar"){
 const reader=new FileReader()
 reader.onload=()=>{
    if(reader.readyState===2){
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
    }
 }
 const file=e.target.files[0]

   reader.readAsDataURL(file)
 
}else{
    setUser({...user,[e.target.name]:e.target.value})
}
}

useEffect(()=>{
    if (error) {
        alert.error(error);
        dispatch(clearErrors())
    }
    if(isAuthenticated===true){
        nav("/account")
    }
},[dispatch,alert,error,isAuthenticated])
    const switchTabs=(e,tab)=>{
        if(tab=='login'){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if(tab=='register'){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }
  return (
    <>
    {loading?<Loader/>:(
        <>
        <div className='LoginSignUpContainer'>
         <div className='LoginSignUpBox'>
          <div>
             <div className='login_signUp_toggle'>
            <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
            <p onClick={(e)=>switchTabs(e,"register")}>RIGESTER</p>
             </div>
             <button ref={switcherTab}></button>
          </div>
          <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
           <div className='loginEmail'>
             <MailOutlineIcon/>
             <input type="eamil" 
             placeholder='Email'
             required
             value={loginEmail}
             onChange={(e)=>setLoginEmail(e.target.value)}
             
             />
           </div>
           <div className='loginPassword'>
            <LockOpenIcon/>
            <input type="password" 
            placeholder='Password'
            required
            value={loginPassword}
            onChange={(e)=>setLoginPassword(e.target.value)}
            />
           </div>
            <Link to="/password/forgot">Forgot Password ?</Link>
           <input type="submit" value="login" className="loginBtn " />
          </form>
          <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
          onSubmit={registerSubmit}
          >
          <div className='signupForm'>
             <FaceIcon/>
             <input type="text"
             placeholder='Name'
             required
             name="name"
             value={name}
             onChange={registerDataChange}
             />
          </div>
          <div className='signUpEmail'>
           <MailOutlineIcon/>
           <input type="email" 
           placeholder='Email'
           required
           name="email"
           value={email}
           onChange={registerDataChange}
           />
          </div>
          <div>
             <LockOpenIcon/>
             <input type="password" 
           placeholder='Password'
           required
           name="password"
           value={password}
           onChange={registerDataChange}
           />
          </div>
          <div>
             <LockOpenIcon/>
             <input type="password" 
           placeholder='Password'
           required
           name="password2"
           value={password2}
           onChange={registerDataChange}
           />
          </div>
          <div id="registerImage">
          <img src={avatarPreview} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
             onChange={registerDataChange}
          />
        </div>
          <input type="submit" 
          value="register"
          className="signUpBtn"
          
          /> 
     
          </form>
         </div>
        </div>
        </>
    )}
    </>
  )
}

export default LoginSignup