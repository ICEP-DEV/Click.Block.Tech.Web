import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './insuficientFunds_styles.css';
import logo from '../assets/Logo.png';
import animationData from '../assets/lottie/insufficientFunds.json';
import Lottie from "lottie-react";

export default function InsufficientFundsScreen(){
    const [seconds, setSeconds] = useState(5); // Initial countdown time in seconds
    const navigate = useNavigate();

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
            navigate('/')
          clearInterval(intervalId);
        }
      }, 1000); // Update every 1 second
  
      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, [seconds]);
    return(
        <div className='insuficientFunds-container'>
            <img src={logo} alt="Logo" className="logo" />
            <div className="message-container">
            <div className='nofunds-anim-container'><Lottie animationData={animationData} loop={true} /></div>
                <h3>Insufficient funds!!</h3>
                <p>The session is canceling in {seconds}</p>
            </div>
        </div>
    );
}