import React from 'react'
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()
    const redrictReportEmergency = () =>{
       navigate('/reportEmergency')
    }
    const redrictCheckEmergencies = () =>{
       navigate('/checkForEmergencies')
    }
    return (
        <div className='min-h-screen w-screen bg-background'>

            <div className='h-fit w-screen bg-background text-center text-text  '>
                <h1 className="font-extrabold pt-10 pb-3 text-2xl md:text-3xl text-accent-800 relative group ease-in-out hover:text-primary  ">
                    Your Map. Your Voice. Your Safety.
                </h1>
                <div className='flex w-full h-full text-white justify-evenly items-center'>

                    {/* First Button */}
                    <div>
                        <button onClick={redrictReportEmergency} className='btn relative inline-flex items-center justify-start overflow-hidden font-medium bg-primary rounded hover:bg-accent group py-3.5 px-3.5'>
                            Report Emergency
                        </button>
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-52 w-px bg-accent hover:bg-primary"></div>

                    {/* Second Button */}
                    <div>
                        <button onClick={redrictCheckEmergencies} className='btn relative inline-flex items-center justify-start overflow-hidden font-medium  bg-primary rounded hover:bg-accent group py-3.5 px-3.5'>
                            Check the Emergencies
                        </button>
                    </div>

                </div>

            </div>

            {/* this include what is aertify and function of it */}

            <div className="min-h-screen w-full bg-background px-4 py-10 space-y-10">

                {/* 1️⃣ What is Alertify (Slide from Left) */}
                <div className="max-w-6xl mx-auto bg-primary text-white rounded-2xl shadow-xl border-l-4 border-amber-400 p-6 md:p-10 transform transition duration-1000 animate-slide-in-left hover:shadow-amber-300">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">What is Alertify?</h1>
                    <p className="text-sm md:text-base leading-relaxed mb-3">
                        Alertify is a real-time, map-driven emergency reporting platform built to empower individuals and communities in times of crisis. Using the power of location data, modern mapping technology, and crowdsourced reporting, Alertify enables users to swiftly report incidents such as natural disasters (like landslides or floods), road accidents, infrastructure damage, or any local emergencies that require attention.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed mb-3">
                        With just a few taps, users can mark their exact location on a live map, upload images for clarity, and provide a short description of the issue. These reports are then made instantly visible to nearby users, authorities, or disaster response teams.
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                        The platform is mobile-friendly, lightweight, and functional even in low-bandwidth areas — ensuring accessibility for remote or rural communities.
                    </p>
                </div>

                {/* 2️⃣ Features (Slide from Right) */}
                <div className="max-w-6xl mx-auto bg-accent text-white rounded-2xl shadow-xl border-r-4 border-amber-400 p-6 md:p-10 transform transition duration-1000 animate-slide-in-right  hover:shadow-amber-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Key Features</h2>
                    <p>Alertify offers a seamless and intuitive way to report emergencies using an interactive map interface. Users can quickly pinpoint their exact location and submit detailed reports about incidents such as landslides, accidents, floods, or other urgent situations. Each report can include a description along with real-time image uploads to provide visual clarity for responders or nearby users. The platform automatically captures geolocation data, ensuring accurate and reliable reporting. All submitted reports are displayed on a live map with colored markers for easy tracking and navigation. Alertify is mobile-friendly and optimized for fast performance, making it ideal for use in time-sensitive or low-connectivity situations. Its community-driven approach allows people to stay informed and authorities to respond faster, creating a more connected and safer environment.</p>
                </div>
            </div>


        </div>
    )
}

export default Home
