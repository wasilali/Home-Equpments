import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom"
const Contact = () => {
  const sendEmail = () => {
    const recipient = 'wasilsohail123456@gmail.com';
    const subject = '';
    const body = '';

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };
  return (
    <div className="contactContainer">
      <Link className="mailBtn" to="">
        <Button onClick={sendEmail} style={{color:"white"}}>Contact: wasilsohail123456@gmail.com</Button>
      </Link>
    </div>
  );
};

export default Contact;
