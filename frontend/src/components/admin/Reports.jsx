import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetData from "../layout/MetData";
import Sidebar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { getAllReport,clearErrors, deleteReport } from "../../actions/reportAction";
import { DELETE_REPORT_RESET } from "../../constants/reportConstant";


const Reports = () => {
  const dispatch = useDispatch();
const nav = useNavigate()
  const alert = useAlert();


  const {error,loading,reports}=useSelector(st=>st.report)

  const {error:deleteError ,message} = useSelector(st=>st.deleteReport)



  const deleteOrderHandler = (id) => {
    console.log(id);
    dispatch(deleteReport(id));
  };

  useEffect(() => {

dispatch(getAllReport())
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);

      dispatch({ type: DELETE_REPORT_RESET });
    }

  }, [dispatch, alert, error,deleteError,message]);

  const columns = [
    {
        field: "From",
        headerName: "From",
        type: "number",
        minWidth: 150,
        flex:0,
      },
      {
        field: "Reason",
        headerName: "Reason",
        type: "number",
        minWidth: 150,
        flex: 0.2,
        cellClassName: (params) => {
            return "redColor";
          },
      },
    {
      field: "Discription",
      headerName: "Description",
      minWidth: 100,
      flex: .8,
      cellClassName: (params) => {
        return "greenColor";
      },
    },




    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reports &&
  reports.forEach((item) => {
      rows.push({
        id:item._id,
        From: item.from.name,
        Reason: item.reason,
        Discription: item.description,
      });
    });

  return (
    <>
      <MetData title={`ALL orders - Admin`} />

      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default Reports;