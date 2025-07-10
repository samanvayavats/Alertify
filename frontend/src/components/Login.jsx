import React,{useState} from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas/index.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialValues = {
    name :"",
    email:"",
    password:""
}

const Login = () => {
 const [isUploading, setisUploading] = useState(false)
 const navigate = useNavigate()

 const onClickOnLogin = () =>{
  navigate('/register')
 }
   
  const {values , handleBlur , handleChange , handleSubmit , errors , touched} = useFormik({
    initialValues,
    validationSchema : loginSchema,
    onSubmit :async (values , action)=>{
     setisUploading(true)  
     console.log("values : ",values)
     await axios.post("http://localhost:8000/api/v1/user/login" , values ,{withCredentials : true})
     .then( function (response){
      console.log("the response from the backend" , response.data)
      toast.success("login successfully")
      action.resetForm()
      navigate('/')
     })
     .catch(function(error){
      console.log("Somthing went in Login" , error)
      toast.error('Login failed' , error)
     })
     .finally(function(){
       setisUploading(false)
     })
    }
  })


  return (
     <div className='min-h-screen w-screen flex items-center justify-center bg-background '>
      <form onSubmit={handleSubmit} className='w-full max-w-md p-6 bg-primary rounded-lg flex flex-col items-center gap-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-50'>Login</h2>

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
        <button 
        disabled ={isUploading}
        className='bg-accent h-10 w-full rounded-md border text-cyan-50 mt-1 hover:bg-accent/80'>
          {isUploading ? 'Logging...' : 'Login'}
        </button>
        
        <div className='flex '>
          <p className='text-text pr-1'>Not registerd ?  
          </p>
            <p className='text-text pr-1 hover:underline'
            onClick={onClickOnLogin}
            >Register</p>
        </div>



      </form>
    </div>

  );
};

export default Login;
