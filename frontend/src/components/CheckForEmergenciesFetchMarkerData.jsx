import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard.jsx'
import dicess from '../assets/dicess.jpg';
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

const CheckForEmergenciesFetchMarkerData = () => {
  const { id } = useParams();
  const marker = dummyMarkers.find((e) => e.id === Number(id)); // convert id to number

  if (!marker) {
    return <p className='text-center py-10'>No marker found for ID: {id}</p>;
  }

  return (
    <div >
      <PostCard
        user={{
          name: "Samanvaya Vats",
          profileImage: dicess
        }}
        imageUrl="https://images.unsplash.com/photo-1659959103870-c4beea371a9b?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        videoUrl="sc"
        caption="Nature is so beautiful and the weather is best 🌿"
         // or "video"
      />
    </div>
  );
};

export default CheckForEmergenciesFetchMarkerData;
