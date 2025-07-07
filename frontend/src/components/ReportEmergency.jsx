import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const containerStyle = {
  width: '100%',
  height: '80vh',
  marginTop: '50px',
};

const mapOptions = {
  mapId: import.meta.env.VITE_GOOGLE_MAPS_KEY, // vector map ID
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const libraries = ['places']; // 'marker' not needed when using <Marker />, only for AdvancedMarkerElement

function ReportEmergency() {


  const navigate = useNavigate()

  const [userLocation, setUserLocation] = useState(null);

  const sendLocationToBackend = async () =>{
       try {
        const res = await api.post('/v1/location/get-location' , userLocation)
        console.log("res " , res)
       } catch (error) {
         toast.error('Error in Fetching location ',error)
         console.log("Error : " , error)
       }
  }

  const redirectReportEmergencyMediaAndCaption = () =>{
     sendLocationToBackend()
    navigate("/reportEmergencyMediaAndCaption")
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:import.meta.env.VITE_API_URL ,
    libraries,
  });
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(loc);
        console.log(loc)
       
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  if (!isLoaded) return <p className="text-center py-10">Loading map...</p>;
  if (!userLocation) return <p className="text-center py-10">Fetching your location...</p>;

  return (
    <div className="min-h-screen w-screen bg-background px-4 py-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={14}
        options={mapOptions}
      >
        <Marker
        onClick={redirectReportEmergencyMediaAndCaption}
          position={userLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          draggable={false} // ✅ fixed in place
        />
      </GoogleMap>
    </div>
  );
}

export default ReportEmergency;
