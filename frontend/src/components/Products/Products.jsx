import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getProduct,clearErrors} from '../../actions/productAction'
import ProductCard from '../layout/ProductCard/ProductCard'
import Loader from '../layout/loading/Loader'
import { useEffect } from 'react'
import './products.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider';
import { useAlert } from 'react-alert';
import MetData from '../layout/MetData'
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const categorys= [
  "Laptop",
  "Mobiles",
  "Shoes",
  "Watches",
  "Clothes",
  "Camera",
  "mashine1",
]

const Products = () => {
  let alert=useAlert();
  //pagination;
const [currentPage,setCurretPage]=useState(1)

const [price,setPrice]=useState([0,25000])

const [category,setCategory]=useState("")

const [ratings,setRatings]= useState(0)

  //for the filteration
    const dispatch=useDispatch()

   const params=useParams()

    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount}=useSelector((state)=>state.products)

    const keyword=params.keyword
    useEffect(() => {
      if (error) {
        alert.error(error)
        dispatch(clearErrors())
      }
      dispatch(getProduct(keyword,currentPage,price,category,ratings))
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error])
    //pagination
const setCurrentPageNo=(e)=>{
  setCurretPage(e)
}

const priceHandler=(event,newPrice)=>{
  setPrice(newPrice)
}
const count=filteredProductsCount
const classes = useStyles();
  return (
    <>
    {loading ? <Loader/> : (
        <>
        <MetData title="PRODUCTS-Ecommerice"/>
        <h2 className="productsHeading">Equipments</h2>
        {/* <div className={classes.root}>
      <SearchIcon className={classes.icon} />
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <Button className={classes.button} variant="contained">
        Search
      </Button>
    </div> */}
<div className="products">
  
  {products &&
    products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
</div>

<div className="filterBox mt-10">
  <h4 className='margins text-[2rem] text-[tomato]'>Price</h4>
  <Slider
    value={price}
    onChange={priceHandler}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
    min={0}
    max={25000}
  />

  <h4 className='margins text-[2rem] text-[tomato]'>Categories</h4>
  <ul className="categoryBox">
    {categorys.map((category) => (
      <li
        className="category-link"
        key={category}
        onClick={() => setCategory(category)}
      >
        {category}
      </li>
    ))}
  </ul>

  <fieldset>
    <h4 className='margins text-[2rem] text-[tomato]' component="legend">Ratings</h4>
    <Slider
      value={ratings}
      onChange={(e, newRating) => {
        setRatings(newRating);
      }}
      aria-labelledby="continuous-slider"
      valueLabelDisplay="auto"
      min={0}
      max={5}
    />
  </fieldset>
</div>
{resultPerPage < count && (
  <div className="paginationBox">
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={resultPerPage}
      totalItemsCount={productsCount}
      onChange={setCurrentPageNo}
      nextPageText="Next"
      prevPageText="Prev"
      firstPageText="1st"
      lastPageText="Last"
      itemClass="page-item"
      linkClass="page-link"
      activeClass="pageItemActive"
      activeLinkClass="pageLinkActive"
    />
  </div>
)}
        </>
    )}
    </>
  )
}

export default Products