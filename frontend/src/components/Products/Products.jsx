import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productAction';
import ProductCard from '../layout/ProductCard/ProductCard';
import Loader from '../layout/loading/Loader';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useAlert } from 'react-alert';
import MetData from '../layout/MetData';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Button, Select, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import "./products.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    background:"#333",
    margin: '2rem auto 0',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      width: '90%',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1, 2),
    backgroundColor: "tomato",
    color: theme.palette.primary.contrastText,
    
    '&:hover': {
      backgroundColor: "yellow",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const categories = [
  "Laptop",
  "Mobiles",
  "Shoes",
  "Watches",
  "Clothes",
  "Camera",
  "Machine1",
];

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

const [keywords,setKeyword]=useState("")
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        //trim is for deceted space in scearchbar
        console.log('keywords',keywords);
        if(keywords.trim()){
         window.location.replace(`/products/${keywords}`)
        }else{
         window.location.replace(`/products`)
          
        }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        searchSubmitHandler(event);
      }
    };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetData title="PRODUCTS-Ecommerce" />
          <div className={classes.root}>
            <SearchIcon className={classes.icon} />
            <InputBase
              className={classes.input}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setKeyword(e.target.value)}
              value={keywords}
              onKeyPress={handleKeyDown}
            />
            <Button onClick={searchSubmitHandler} className={classes.button} variant="contained">
              Search
            </Button>
          </div>
          <div className=" p-[30px] xl:px-12 grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-3">
            <div className=' flex'>
            <h4 className='text-[2rem] text-[tomato]'>Price:</h4>
  <Slider
  style={{width:"70%",marginLeft:"1rem  ",marginTop:".5rem"}}
    value={price}
    onChange={priceHandler}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
    min={0}
    max={25000}
  />
            </div>
<div className=' flex'>
<h4 className='text-[2rem] text-[tomato]'>Categories:</h4>

<Select
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      className={classes.selectMenu}
      style={{ width: '60%', marginLeft: '1rem', marginTop: '.5rem', color: 'white',background:"#333" }}
      displayEmpty
      renderValue={(selected) => (selected ? selected : 'Select category')}
      MenuProps={{
        classes: { paper: 'select-menu-paper' },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
      IconComponent={() => <span className={classes.icon}>&#9662;</span>}
    >
      {categories.map((category) => (
        <MenuItem key={category} value={category} style={{width:"100%"}}>
          {category}
        </MenuItem>
      ))}
    </Select>
</div>

  <fieldset className=' flex'>
    <h4 className='text-[2rem] text-[tomato]' component="legend">Ratings:</h4>
    <Slider
      style={{width:"70%",marginLeft:"1rem  ",marginTop:".5rem"}}
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
          <div className="px-5 xl:px-12 grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-3 mx-auto">
            {products &&
              products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
         {resultPerPage < count &&  <div className="paginationContainer mt-[3.5rem]">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={keyword ? filteredProductsCount : productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>}
        </>
      )}
    </>
  );
};

export default Products;
