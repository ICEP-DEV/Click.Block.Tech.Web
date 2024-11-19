import React, { useMemo, useEffect } from 'react';
import './realTime.css';  // Import the CSS for styling
// Import your icons 
import UserIcon from '../assets/user.png';
import BellIcon from '../assets/padlock.png';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';
import storage from '../async_storage';
// Import the background image
import BackgroundImage from '../assets/backgroundPic.jpeg';
import useLocationIDStore from '../stores/locationID_store';
import { BASE_URL } from '../API/API';
import axios from 'axios';
import { useState } from 'react';

 function RealTimeTracking() {
  const updateLocationID = useLocationIDStore((state) => state.updateLocationID);
  const updatedLocationID = useLocationIDStore((state) => state.LocationID)
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [iscoord, setIsCoord] = useState(false);
  const handleBackClick = async() => {
    console.log("Refresh button clicked");
  };
  const position = { lat: parseFloat(latitude), lng: parseFloat(longitude)};
  useEffect(() => {
    
    const fetchLocationLatLong = async () => {
      try{
        const locationID = await storage.getItem('locationID');
        if(locationID){
          updateLocationID(locationID);
          console.log(`ID is still: ${locationID}`)
          const response = await axios.get(`${BASE_URL}/getLocationbyID/${locationID}`);
          const locationData = response.data;
          console.log(locationData);
          console.log(`lat: ${locationData.result._Latitude} long: ${locationData.result._Longitude}`);
       
          setLatitude((prevLatitude) => {
            console.log(`Previous latitude: ${prevLatitude}`);
            return parseFloat(locationData.result._Latitude);
          });
          setLongitude((prevLongitude) => {
            console.log(`Previous longitude: ${prevLongitude}`);
            return parseFloat(locationData.result._Longitude);
          });
          console.log(`latitude: ${latitude}`)
        }else{
          console.log('locationID is empty')
        }
       
      }catch(err){
        console.log(err);
      }
    };
    fetchLocationLatLong();
  }, [latitude, longitude]);
  
  

  const mapScript = useMemo(() => (
    
    <LoadScriptNext googleMapsApiKey="AIzaSyBeolyL2R7XzcicLB5F7IRSY6WBTctwnjk">
          <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100%" }}
            center={position}
            zoom={10}
          >
            <MarkerF position={position} />
          </GoogleMap>
      
    </LoadScriptNext>
  ), [latitude]);

  
  return (
    <div className="realTimeTracking" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      {/* Header Section */}
      <header className="header">
        <div className="header-icon">
          <img src={UserIcon} alt="User Icon" className="icon" />
        </div>
        
        <div className="header-logo">
          <h1>NEXIS</h1>
          <p className="subtitle"> Real-time Tracking {updatedLocationID} </p>
        </div>

        <div className="header-icon">
          <img src={BellIcon} alt="Bell Icon" className="icon" />
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
          { mapScript }
      </div>

      {/* refresh Button Outside the Container */}
      <button className="refresh-button" onClick={handleBackClick}>Refresh</button>
    </div>
  );
}

export default RealTimeTracking;

