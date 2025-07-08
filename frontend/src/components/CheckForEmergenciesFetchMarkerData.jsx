import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import PostCard from './PostCard';

const CheckForEmergenciesFetchMarkerData = () => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataFromBackend = async (id) => {
    try {
      const result = await api.get(`/v1/locationandmedia/getdata/${id}`);
      console.log("Fetched data:", result.data.data);
      setBackendData(result.data.data);  // ✅ `data` is inside `result.data`
    } catch (error) {
      console.error("error from the backend", error);
      toast.error('Cannot fetch the media!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromBackend(id);
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading data...</p>;
  if (!backendData) return <p className="text-center py-10">No data found for ID: {id}</p>;

  return (
    <div className="p-5">
      <PostCard
        user={{
          name: backendData.name,
          profileImage: backendData.avatar,
        }}
        imageUrls={backendData.photos || []}
        videoUrl={backendData.video}
        caption={backendData.caption}
      />
    </div>
  );
};

export default CheckForEmergenciesFetchMarkerData;
