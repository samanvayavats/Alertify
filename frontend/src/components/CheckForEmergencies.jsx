import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance.js'


const containerStyle = {
  width: '100%',
  height: '80vh',
  marginTop: '50px',
};

const mapOptions = {
  mapId: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const libraries = ['places'];

function CheckForEmergencies() {
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();
 const [locationFrombackend, setlocationFrombackend] = useState([])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_URL,
    libraries,
  });

  const apiCallToBackendForLocations = async () => {
    try {
      const result = await api.get('/v1/locationandmedia/get-locations')
      console.log("backend data : ", result.data.data)
      setlocationFrombackend(result.data.data)
    }
    catch (error) {
      console.log("error in fetching the data ", error)
      toast.error('Somthing went wrong !! can not fetch location')
    }

  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(loc);
        apiCallToBackendForLocations()
        console.log("User Location:", loc);
        
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const getvalue = (id) => {
    console.log("The unique ID of the marker:", id);
    navigate(`/checkForEmergenciesFetchMarkerData/${id}`);
  };

  if (!isLoaded) return <p className="text-center py-10">Loading map...</p>;
  if (!userLocation) return <p className="text-center py-10">Fetching your location...</p>;

  return (
    <div className="min-h-screen w-screen bg-background px-4 py-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={4}
        options={mapOptions}
      >
        {locationFrombackend.map((element) => (
          <Marker
            key={element.uniqueId}
            position={{ lat: element.lat, lng: element.lng }}
            onClick={() => getvalue(element._id)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default CheckForEmergencies;
