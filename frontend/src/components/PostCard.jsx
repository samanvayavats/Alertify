import React from 'react';

const PostCard = ({ user, caption, imageUrl, videoUrl }) => {
  return (
    <div className="my-6  max-w-xl mx-auto min-h-screen w-screen bg-background' bg-background border-2 border-accent rounded-3xl shadow-md overflow-hidden">
      {/* User Info */}
      <div className="flex items-center gap-4 p-4">
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
      <div className="w-full bg-background flex flex-col gap-4 px-4 pb-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post media"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-lg border border-accent"
          />
        )}
        {videoUrl && (
          <video
            controls
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-lg border border-accent"
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
