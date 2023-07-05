import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./ChackoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <h3 style={{background:"#333",color:'white'}}>Shipping Details</h3>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <h3 style={{background:"#333",color:'white'}}>Confirm Order</h3>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <h3 style={{background:"#333",color:'white'}}>Payment</h3>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    background:"#333"
  };

  return (
    <Fragment>
      <Stepper className="col" alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "orange" : "tomato",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;