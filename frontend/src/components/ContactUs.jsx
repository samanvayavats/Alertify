import React, { useState } from 'react';
import api from '../utils/axiosInstance.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [isUploading, setisUploading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisUploading(true)
    console.log('Submitted:', form);
    try {
      const response = await api.post('/v1/contactus/contactus' , form)
      console.log(response)
       toast.success("Thnaks for your feedack || we will contact you soon")
    } catch (error) {
      console.log("the error from backend " , error)
      toast.error('Somthing went wrong')
    } finally {
      setForm({ name: '', email: '', message: '' });
      setisUploading(false)
    }
  };

  return (
    <div className="min-h-screen w-screen bg-background px-4 py-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-primary p-8 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-white">Contact Us</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="h-12 px-4 rounded-md text-text bg-white border border-cyan-50 w-full"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="h-12 px-4 rounded-md text-text bg-white border border-cyan-50 w-full"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="px-4 py-3 rounded-md text-text bg-white border border-cyan-50 w-full resize-none"
          required
        />

        <button
        onSubmit={handleSubmit}
         disabled ={isUploading}
          type="submit"
          className="bg-accent text-white rounded-md h-12 hover:bg-accent/80 transition-all"
        >
          {isUploading ? "Sending Message" : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
