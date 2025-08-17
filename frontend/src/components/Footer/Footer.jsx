import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Experience the rich flavors of Gujarat like never before with Food Fusion — your go-to app for traditional favorites and modern fusion dishes. From timeless snacks to innovative meals, we bring the heart of Gujarati cuisine to your doorstep, fresh and full of flavor. One app, endless taste.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Food Fusion</li>
                    <li>Kalawad Road, Rajkot</li>
                    <li>Gujarat, India</li>
                    <li>+91 8866491889</li>
                    <li>foodfusion@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 &copy; Food Fusion - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer