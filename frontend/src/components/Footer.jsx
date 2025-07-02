import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-accent text-white p-6 text-sm w-screen">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h2 className="font-bold text-lg mb-2">Alertify</h2>
      <p>Your voice during emergencies. Report. Share. Stay safe.</p>
    </div>
    <div>
      <h2 className="font-bold text-lg mb-2">Quick Links</h2>
      <ul className="space-y-1">
        <li><NavLink to = '/aboutUs' className={(e) => {return e.isActive ? "" :" hover:underline"}}>About Us</NavLink></li>
        
      </ul>
    </div>
    <div>
      <h2 className="font-bold text-lg mb-2">Contact</h2>
      <p>Email: <a href="mailto:support@alertify.com" className="underline">support@alertify.com</a></p>
      <p>Location: Meerut, India</p>
      <p className="text-xs text-gray-400 mt-4">
        Alertify is a citizen-powered tool. In case of life-threatening emergencies, contact local authorities directly.
      </p>
    </div>
  </div>
  <div className="text-center mt-6 border-t border-gray-700 pt-4">
    © 2025 Alertify. All rights reserved.
  </div>
</footer>

  )
}

export default Footer
