import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import {AiOutlineInstagram,AiOutlineYoutube,AiOutlineFacebook} from 'react-icons/ai'
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Home Equipments</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Muhammad Wasil</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="" className="flex py-2">Instagram <AiOutlineInstagram style={{marginTop:"0.40rem",marginLeft:"1rem"}}/></a>
        <a href="" className="flex py-2">Youtube <AiOutlineYoutube style={{marginTop:"0.40rem",marginLeft:"1rem"}}/></a>
        <a href="" className="flex py-2">Facebook <AiOutlineFacebook style={{marginTop:"0.40rem",marginLeft:"1rem"}}/></a>
      </div>
    </footer>
  );
};

export default Footer;