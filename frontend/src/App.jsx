import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React from 'react'
import AppLayout from "./layout/AppLayout.jsx";
import Home from './pages/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ContactUs from './components/ContactUs.jsx'
import AboutUs from './components/AboutUs.jsx'
import ReportEmergency from './components/ReportEmergency.jsx'
import CheckForEmergencies from './components/CheckForEmergencies.jsx'
import ReportEmergencyMediaAndCaption from "./components/ReportEmergencyMediaAndCaption.jsx";
import CheckForEmergenciesFetchMarkerData from "./components/CheckForEmergenciesFetchMarkerData.jsx";

const routeBrowser = createBrowserRouter([{
   path :'/',
   element :<AppLayout/>,
   children :[
    {
    path : '/',
    element :<Home/>
    },
    {
    path :'/login',
    element : <Login/>
    },
    {
     path :'/register',
     element : <Register/>
    },
    {
    path :'/contactUs',
    element :<ContactUs/>
    },
    {
    path :'/aboutUs',
    element :<AboutUs/>
    },
    {
    path :'/reportEmergency',
    element :<ReportEmergency/>
    },
    {
    path :'/checkForEmergencies',
    element :<CheckForEmergencies/>
    },
    {
    path :'/reportEmergencyMediaAndCaption',
    element :<ReportEmergencyMediaAndCaption/>
    },
    {
      path :'/checkForEmergenciesFetchMarkerData/:id',
      element :<CheckForEmergenciesFetchMarkerData/>
    }
   ]
}])

const App = () => {
  return (
    <>
     <RouterProvider router = {routeBrowser}>
    </RouterProvider>
       <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
