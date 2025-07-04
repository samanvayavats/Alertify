import React from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/index.jsx'

const initialValues = {
    name :"",
    email:"",
    password:""
}

const Login = () => {
   
  const {values , handleBlur , handleChange , handleSubmit , errors , touched} = useFormik({
    initialValues,
    validationSchema : loginSchema,
    onSubmit :(values , action)=>{
      action.resetForm()
      console.log("values : ",values)
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




        <button className='bg-accent h-10 w-full rounded-md border text-cyan-50 mt-1 hover:bg-accent/80'>
          Register
        </button>
      </form>
    </div>

  );
};

export default Login;
