import React from 'react';
import '../styles/Footer.scss'
function Footer(){
    let currentTimeLine = new Date();
    let currentYear =currentTimeLine.getFullYear()
    return(
        <div className="footer-container">
            <a href="https://www.instagram.com/" target="_blank"> <img width="30px" alt="instagram" src="https://img.icons8.com/color/48/000000/instagram-new.png"></img></a>
            <a href="https://twitter.com/" target="_blank"><img width="30px" alt="twitter" src="https://img.icons8.com/color/48/000000/twitter.png"></img></a>
            <a href="https://www.facebook.com/" target="_blank"><img width="30px" alt="facebook" src="https://img.icons8.com/color/48/000000/facebook-new.png"></img></a>
         <p>volevent &copy;{currentYear}</p>
        </div>
    )
}
export default Footer;