import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './dashboard.css'
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import { getAllReport } from '../../actions/reportAction';
const Dashboard = () => {
  const dispatch = useDispatch();
  const {products}=useSelector(state=>state.products);

  const {orders}=useSelector(st=>st.allOrders);

  const { error, users } = useSelector((state) => state.allUsers);
  const { reports } = useSelector((state) => state.report);


  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllReport())

    dispatch(getAllOrder())

    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock=0;

  products&&
  products.forEach(items=>{
    if (items.stock===0){
      outOfStock +=1
    }
  })

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });



  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length-outOfStock],
      },
    ],
  };


  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products&&products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders&&orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users&&users.length}</p>
            </Link>
            <Link to="/admin/reports">
              <p>Reports</p>
              <p>{reports&&reports.length}</p>
            </Link>
          </div>
        </div>
      
        <div className="lineChart">
         <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard