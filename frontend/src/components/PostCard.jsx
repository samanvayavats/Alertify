import React from 'react';

const PostCard = ({ user, caption, imageUrls = [], videoUrl }) => {
  return (
    <div className="my-6 max-w-xl mx-auto min-h-fit w-screen bg-background border-2 border-accent rounded-3xl shadow-md overflow-hidden">
      {/* User Info */}
      <div className="flex items-center border-b-2 border-accent gap-4 p-4 mb-1">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div> 
          <h2 className="text-lg font-semibold text-text">{user.name}</h2>
        </div>
      </div>

      {/* Media */}
      <div className="w-full bg-background flex flex-col items-center gap-4 px-4 pb-4">
        {/* Render multiple images */}
        {imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Post image ${idx + 1}`}
                className="h-40 w-40 object-cover rounded-lg border border-white"
              />
            ))}
          </div>
        )}

        {/* Video */}
        {videoUrl && (
          <video
            controls
            className="h-40 w-40 object-cover rounded-lg border  border-white"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 text-white text-sm bg-accent rounded-b-2xl">
        <p>{caption}</p>
      </div>
    </div>
  );
};


export default PostCard;
