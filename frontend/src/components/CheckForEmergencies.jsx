import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const dummyMarkers = [
  {
    id: 1,
    title: "Landslide Reported",
    description: "Major landslide blocking road",
    latitude: 27.1767,
    longitude: 78.0081,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    title: "Accident Zone",
    description: "Two-wheeler accident reported here",
    latitude: 28.6139,
    longitude: 77.2090,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    title: "Flooded Area",
    description: "Waterlogging due to heavy rain",
    latitude: 19.0760,
    longitude: 72.8777,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    title: "Fire Outbreak",
    description: "Fire in residential building",
    latitude: 13.0827,
    longitude: 80.2707,
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    title: "Blocked Road",
    description: "Tree fallen on the main road",
    latitude: 22.5726,
    longitude: 88.3639,
    imageUrl: "https://via.placeholder.com/100",
  },
];

const containerStyle = {
  width: '100%',
  height: '80vh',
  marginTop: '50px',
};

const mapOptions = {
  mapId: '573ca9d9b3a1ede8f31ead45',
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const libraries = ['places'];

function CheckForEmergencies() {
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCv6uk9z_vCc0ZiuSFXy2SB8BiNdaD1mMI',
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
        {dummyMarkers.map((element) => (
          <Marker
            key={element.id}
            position={{ lat: element.latitude, lng: element.longitude }}
            onClick={() => getvalue(element.id)} 
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
