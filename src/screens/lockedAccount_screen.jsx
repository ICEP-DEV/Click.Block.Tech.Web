import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './lockedAccount_styles.css';
import logo from '../assets/Logo.png';
import animationData from '../assets/lottie/lockedAccount.json';
import Lottie from "lottie-react";
export default function LockedAccountScreen(){
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

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
        <div className="lockedAccount-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="message-container">
            <div className='accLocked-container'><Lottie animationData={animationData} loop={true} /></div>
                <h3>Your account is locked!!</h3>
                <p>Please contact Admin to help you unlock your account</p>
                <p>The session is canceling in {seconds}</p>
            </div>
        </div>
    );
}