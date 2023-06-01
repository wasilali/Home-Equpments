import React from 'react'
import './footer.css'
import wave from '../../../images/wave.png'
const Footer = () => {
  const style_2={
    backgroundImage: 'url('+wave+')',
  }p
  return (
    <>
    <footer>
        <div className='waves'>
            <span className="wave" style={style_2} id="wave1"></span>
            <span className="wave" style={style_2}  id="wave2"></span>
            <span className="wave" style={style_2}  id="wave3"></span>
            <span className="wave" style={style_2}  id="wave4"></span>
          </div>
          <div className="wrapper">
         <div className="icon facebook">
            <div className="tooltip">
               Facebook
            </div>
            <span> <a href="https://www.facebook.com/gulraiz.hero.18/"><i className="fab fa-facebook-f"></i></a></span>
         </div>
         <div className="icon twitter">
            <div className="tooltip">
               Twitter
            </div>
            <span> <a href=""><i className="fab fa-twitter"></i></a></span>
         </div>
         <div className="icon instagram">
            <div className="tooltip">
               Instagram
            </div>
            <span> <a href=""><i className="fab fa-instagram"></i></a></span>
         </div>
         <div className="icon github">
            <div className="tooltip">
               Google
            </div>
            <span> <a href=""><i className="fab fa-github"></i></a></span>
         </div>
      </div>
   
             <p id='f1'>Ecommerice High Quality is our first priority</p>
           
         <p id='f3'>Thanks for visiting our website I wish you see best prices here</p>
         <p id='f2'>©2022 the :: developed by <strong>DMR Company</strong></p>
    </footer>
    </>
  )
}

export default Footer