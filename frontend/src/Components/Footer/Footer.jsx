import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Thank you for visiting our food delivery website! We’re here to make ordering your favorite dishes easy and convenient.
                     If you have questions or need help, check out our “Contact” pages. Stay connected by following us on social media 
                     and signing up for our newsletter for the latest updates and exclusive deals..</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
            </div>
            <div className="footer-content-center">
               <h2>Company</h2>
               <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
               </ul>
            </div>
            <div className="footer-content-right">
               <h2>
                GET IN TOUCH
                   </h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@tomato.com</li>
                </ul>
            
            </div>
        </div>
        <hr />
        <p className="footer-copyright">  Copyright  2025 © Tomato.com - All Rights Reserved. </p>
    </div>
  )
}

export default Footer