import { useNavigate } from 'react-router-dom';
import storage from '../../async_storage';
export default function ViewLiveLocationBtn({route, locationID}){
   
 
    const navigate = useNavigate();
    const nav =() =>{
        //adding locationID in local storage
        storage.setItem('locationID', locationID);
        navigate(`${route}`)
    }
    return(
    <div className="alert_liveLocation_btn">
        <button onClick={nav}>View</button>
    </div>
    );
}