import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-primary w-screen flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 md:px-16 shadow-md'>
      {/* Logo */}
      <div className='text-text font-bold flex items-center justify-between w-full md:w-auto'>
        <div className='flex items-center'>
          <lord-icon
            src="https://cdn.lordicon.com/onmwuuox.json"
            trigger="hover"
            stroke="bold"
            colors="primary:'#0c1446',secondary:'#0c1446'"
            style={{ width: '50px', height: '50px' }}>
          </lord-icon>
          <h1 className='text-lg md:text-2xl pl-2 pt-1'>Alertify</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav Menu */}
      <ul className={`flex-col md:flex-row md:flex gap-4 mt-3 md:mt-0 text-white font-medium ${menuOpen ? 'flex' : 'hidden'} md:gap-6`}>
        <li className='text-center md:text-left'>
          <NavLink
            to='/'
            className='block px-4 py-2 rounded-md hover:bg-accent border border-white'
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li className='text-center md:text-left'>
          <NavLink
            to='/aboutUs'
            className='block px-4 py-2 rounded-md hover:bg-accent border border-white'
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </NavLink>
        </li>
        <li className='text-center md:text-left'>
          <NavLink
            to='/contactUs'
            className='block px-4 py-2 rounded-md hover:bg-accent border border-white'
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
