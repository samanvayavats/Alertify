# 🚨 Alertify - Emergency Reporting Platform

Alertify is a full-stack web application that allows users to report emergencies with live location, images, videos, and captions. It is designed to help authorities or communities track real-time issues such as landslides, accidents, floods, etc., using geolocation and rich media.

---

## 📌 Features

- 🧭 **Live Location Capture** via Geolocation API
- 🖼️ **Media Uploads**: Up to 3 images and 1 video per report
- 📝 **Caption Input** for context on the situation
- 🗺️ **Google Maps Integration** to display emergency reports
- 🧠 **MongoDB Aggregation** to fetch media-rich location data
- 🔒 **User Authentication** (JWT + Cookies)
- 🔄 **Session Refresh Support**
- 🌐 **Cloudinary Integration** for media storage

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**
- **React Toastify**
- **@react-google-maps/api**

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Multer for file handling**
- **Cloudinary for image/video hosting**
- **JWT for authentication**

---

## ⚙️ Project Structure

Alertify/
├── backend/
│ ├── controllers/
│ ├── db/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ └── utils/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── layout/
│ │ ├── pages/
│ │ ├── schemas/
│ │ ├── utils/
│ │ └── App.jsx
└── README.md


---

## 🚀 Getting Started

### 1. Clone the Repository


git clone https://github.com/samanvayavats/Alertify.git
cd alertify

/backend/.env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

/frontend/.env
VITE_API_URL=your_api
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.
