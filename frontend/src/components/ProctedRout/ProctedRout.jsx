import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
import LoginSignup from '../User/LoginSignup'
const ProctedRout = ({isAdmin,isAunthenticated}) => {

    const {user}=useSelector(state=>state.user)

    
    if (isAunthenticated===false) {
        return <Navigate to={'/login'}/>
    }
    if(isAunthenticated===false&&isAdmin===true && user.role !=="admin"){
        return <Navigate to={'/login'}/>
    }
    return <Outlet/>
}

export default ProctedRout