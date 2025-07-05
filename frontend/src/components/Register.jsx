import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../schemas/index.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialValues = {
  name: "",
  fullname: "",
  email: "",
  password: "",
  confirm_password: "",
  avatar: null
}


// console.log(registration)

const Register = () => {
  const [isUploading, setisUploading] = useState(false)
  const navigate = useNavigate()

  const { values, handleBlur, handleChange, handleSubmit, errors, setFieldValue, touched } = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, action) => {
      // console.log("values", values)
      setisUploading(true)
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
       await axios.post('http://localhost:8000/api/v1/user/register', formData)
        .then(function (response) {
          console.log("the response from backend ", response)
          toast.success('Regisration successfully redirecting to login')
          action.resetForm()
          navigate('/login')
        })
        .catch(function (error) {
          toast.warning('Regisration Failed',error)
          console.log("failed to fetch the request ", error)
        })
        .finally(function(){
          setisUploading(false)
        })

    }
  })

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-background '>
      <form onSubmit={handleSubmit} className='w-full max-w-md p-6 bg-primary rounded-lg flex flex-col items-center gap-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-50'>Register</h2>

        {/* name */}

        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`
                        w-full h-12 px-4 rounded-lg border 
                        ${errors.name && touched.name ? 'border-alert' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-accent 
                        placeholder-gray-400 text-text bg-white 
                        transition duration-200 ease-in-out
                      `}
          />
          {errors.name && touched.name && (
            <p className="font-medium text-alert mt-1">{errors.name}</p>
          )}
        </div>

        {/* fullname */}

        <div className="w-full mb-4">
          <input
            type="text"
            placeholder='Fullname'
            name='fullname'
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`
                        w-full h-12 px-4 rounded-lg border 
                        ${errors.fullname && touched.fullname ? 'border-alert' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-accent 
                        placeholder-gray-400 text-text bg-white 
                        transition duration-200 ease-in-out
                      `}
          />
          {errors.fullname && touched.fullname && (
            <p className="font-medium text-alert mt-1">{errors.fullname}</p>
          )}
        </div>

        {/* email */}

        <div className="w-full mb-4">
          <input
            type="email"
            placeholder='Email'
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`
                        w-full h-12 px-4 rounded-lg border 
                        ${errors.email && touched.email ? 'border-alert' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-accent 
                        placeholder-gray-400 text-text bg-white 
                        transition duration-200 ease-in-out
                      `}
          />
          {errors.email && touched.email && (
            <p className="font-medium text-alert mt-1">{errors.email}</p>
          )}

        </div>

        {/* password */}

        <div className="w-full mb-4" >
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`
                        w-full h-12 px-4 rounded-lg border 
                        ${errors.password && touched.password ? 'border-alert' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-accent 
                        placeholder-gray-400 text-text bg-white 
                        transition duration-200 ease-in-out
                      `}
          />
          {errors.password && touched.password && (
            <p className="font-medium text-alert mt-1">{errors.password}</p>
          )}
        </div>

        {/* confirm */}
        <div className="w-full mb-4"  >
          <input
            type="password"
            placeholder='confirm password'
            name='confirm_password'
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`
                        w-full h-12 px-4 rounded-lg border 
                        ${errors.confirm_password && touched.confirm_password ? 'border-alert' : 'border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-accent
                        placeholder-gray-400 text-text bg-white 
                        transition duration-200 ease-in-out
                      `}
          />
          {errors.confirm_password && touched.confirm_password && (
            <p className="font-medium text-alert mt-1">{errors.confirm_password}</p>
          )}


        </div>

        {/* avatar */}

        <div className="w-full mb-1 text-center">
          <label className="block text-sm font-medium text-gray-50 mb-2">
            Avatar
          </label>

          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(event) => {
              setFieldValue("avatar", event.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
            className={`
                      w-full rounded-md bg-accent text-cyan-50 
                      file:mr-4 file:py-2 file:px-4 
                      file:rounded-md file:border-0 file:text-sm 
                      file:bg-accent file:text-white 
                      hover:file:bg-accent/90
                      ${touched.avatar && errors.avatar ? "border border-alert" : "border border-transparent"}
                    `}
          />

          {/* Image Preview */}
          {values.avatar && (
            <img
              src={URL.createObjectURL(values.avatar)}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-full mt-1 mx-auto border border-white"
            />
          )}

          {/* Error Message */}
          {touched.avatar && errors.avatar && (
            <p className="font-medium text-alert mt-1">{errors.avatar}</p>
          )}
        </div>


        <button disabled ={isUploading}
        className='bg-accent h-10 w-full rounded-md border text-cyan-50 mt-1 hover:bg-accent/80'>
          {isUploading ?'Registering...':"Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
