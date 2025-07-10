import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', form);
    // Optionally reset
    setForm({ name: '', email: '', subject: '', message: '' });
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
          type="submit"
          className="bg-accent text-white rounded-md h-12 hover:bg-accent/80 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
