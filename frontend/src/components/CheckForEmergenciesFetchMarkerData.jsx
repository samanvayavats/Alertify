import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard.jsx'
import dicess from '../assets/dicess.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/axiosInstance.js';

const CheckForEmergenciesFetchMarkerData = () => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setimages] = useState([])

  const getDataFromBackend = async (id) => {
    try {
      const result = await api.get(`/v1/locationandmedia/getdata/${id}`);
      console.log("Fetched data:", result.data.data);
      setBackendData(result.data.data);
      setimages[backendData.photos]

    } catch (error) {
      console.log("error from the backend", error);
      toast.error('Cannot fetch the media!!!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromBackend(id);
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading data...</p>;

  if (!backendData) {
    return <p className="text-center py-10">No marker found for ID: {id}</p>;
  }

  return (
    <div className="p-5">
      <PostCard
        user={{
          name: backendData.name,
          profileImage: backendData.avatar
        }}
        imageUrls={backendData.photos}  // ✅ now an array
        videoUrl={backendData.video}
        caption={backendData.caption}
      />
    </div>
  );
};

// export default CheckForEmergenciesFetchMarkerData;

export default CheckForEmergenciesFetchMarkerData;
