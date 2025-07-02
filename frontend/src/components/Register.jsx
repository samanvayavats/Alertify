import React, { useState } from 'react';

const Register = () => {
  const [avatar, setAvatar] = useState(null);

  const handleImageChangetAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      console.log(file);
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-background px-4'>
      <form className='w-full max-w-md p-6 bg-primary rounded-lg flex flex-col items-center gap-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-50'>Register</h2>

        <input
          type="text"
          placeholder='Username'
          className='h-10 px-4 rounded-md w-full text-center text-text bg-white border border-cyan-50'
          required
          />
        <input
          type="text"
          placeholder='Fullname'
          className='h-10 px-4 rounded-md w-full text-center text-text bg-white border border-cyan-50'
          required
          />
        <input
          type="email"
          placeholder='Email'
          className='h-10 px-4 rounded-md w-full text-center text-text bg-white border border-cyan-50'
          required
          />
        <input
          type="password"
          placeholder='Password'
          className='h-10 px-4 rounded-md w-full text-center text-text bg-white border border-cyan-50'
          required
          />

        <div className='w-full text-center'>
          <label className='block text-sm font-medium text-gray-50 mb-2'>Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChangetAvatar}
            className='rounded-md text-cyan-50 bg-accent w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-accent/90'
            required
          />
          {avatar && (
            <img
              src={avatar}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-full mt-2 mx-auto"
            />
          )}
        </div>

        <button className='bg-accent h-10 w-full rounded-md border text-cyan-50 mt-3 hover:bg-accent/80'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
