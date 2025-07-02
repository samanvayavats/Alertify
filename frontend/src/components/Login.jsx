import React from 'react';

const Login = () => {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-background px-4'>
      <form className='w-full max-w-md p-6 bg-primary rounded-lg flex flex-col items-center gap-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-50'>Login</h2>

        <input
          type="text"
          placeholder='Username'
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

        <button className='bg-accent h-10 w-full rounded-md border text-cyan-50 mt-3 hover:bg-accent/80'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
