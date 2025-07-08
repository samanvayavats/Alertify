import React, { useState, useEffect } from 'react';
import api from '../utils/axiosInstance.js'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportEmergencyMediaAndCaption = () => {
  const [images, setImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMaxImages, setIsMaxImages] = useState(false);
  const [caption, setCaption] = useState('')
  const [userLocation, setUserLocation] = useState(null);

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

  const getTheCaption = (e) => {
    setCaption(e.target.value)
    console.log(caption)
  }

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = null;

    if (images.length + files.length > 3) {
      setIsMaxImages(true);
      toast.warn('You can only upload a maximum of 3 images.', {
        position: "top-center"
      });
      return;
    }

    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length < 3) setIsMaxImages(false); // ✅ reset max image flag
      return updated;
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const sendMediaToBackend = async () => {
    if ((!videoFile && images.length === 0) || (!caption)) {
      toast.warn('Please upload at least one file and please add the caption.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    // for (let value in images) {
    //     formData.append(value, images[value]);
    //   }
    if (userLocation) formData.append('lat', userLocation.lat)
    if (userLocation) formData.append('lng', userLocation.lng)
    if (videoFile) formData.append('video', videoFile);
    if (caption) formData.append("caption", caption)

    console.log(formData)
    try {
      const res = await api.post('/v1/locationandmedia/location-and-media', formData)
      console.log("res : ", res)
      toast.success('Uploaded successfully!')
      setImages([]);
      setVideoFile(null);
      setVideoPreview(null);
      setCaption('')
    } catch (err) {
      console.error('Error uploading:', err);
      toast.error('Upload failed!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='min-h-screen w-screen bg-background flex flex-col items-center py-10'>

      <div className="w-fit mx-auto my-10 px-6 py-6 bg-background border-2 border-black rounded-lg text-center text-accent">
        <label className="block mb-4 text-sm font-bold text-text">Add Caption</label>
        <input
          onChange={getTheCaption}
          type="text"
          placeholder="Write your caption..."
          className="lg:w-[600px] px-6 py-4 rounded-md bg-white text-accent placeholder:text-left placeholder:text-white focus:outline-none  sm:w-[400px] border-2 border-accent font-mono"
        />
      </div>



      {/* Images */}
      <div className="w-fit text-center bg-background rounded-lg border-black text-accent border-2 px-4 ">
        <label className="block text-sm font-extrabold text-text my-5">Upload Images</label>
        <p className='mb-3 font-medium text-text'>Max 3 images allowed</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImage}
          disabled={isMaxImages}
          className="rounded-md  bg-accent w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-accent/90 disabled:opacity-50"
        />
        <div className="flex gap-4 my-5 justify-center flex-wrap">
          {images.map((file, index) => (
            <div key={`${file.name}-${file.lastModified}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="h-20 w-20 object-cover rounded-lg border border-white"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                disabled={isUploading}
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="w-fit text-center mt-10 rounded-lg border-black border-2 text-accent px-5 py-8">
        <label className="block text-sm text-text font-extrabold my-2 ">Upload a Video</label>
        <p className='mb-3  font-medium text-text'>Only 1 video allowed</p>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          disabled={isUploading}
          className="rounded-md bg-accent w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-accent/90 disabled:opacity-50"
        />
        {videoPreview && (
          <video
            src={videoPreview}
            controls
            className="h-40 my-5 w-auto rounded-md mx-auto border border-white"
          />
        )}
      </div>

      {/* Upload */}
      <div className='bg-accent px-10 py-2 text-white rounded-md mt-6'>
        <button
          onClick={sendMediaToBackend}
          disabled={isUploading}
          className="disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default ReportEmergencyMediaAndCaption;
