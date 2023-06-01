import React, { useState } from 'react'
import './Search.css'
import MetData from '../layout/MetData'
import {Navigate} from 'react-router-dom'
const Search = ({history}) => {
    const [keyword,setKeyword]=useState("")
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        //trim is for deceted space in scearchbar
        if(keyword.trim()){
         window.location.replace(`/products/${keyword}`)
        }else{
         window.location.replace(`/products`)
          
        }
    }
  return (
    <>
    <MetData title="PRODUCTS SEARCH--Ecommerice"/>
    <form className='searchBox' onSubmit={searchSubmitHandler}>
     <input type="text" placeholder='Search a product...' onChange={(e)=>setKeyword(e.target.value)} />
     <input type="submit" value="search" />
    </form>
    </>
  )
}

export default Search