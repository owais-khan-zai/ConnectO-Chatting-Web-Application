import React, { useEffect, useReducer, useRef, useState } from 'react'
import { toast } from "react-toastify";
import logo from '../../assets/webAssets/logo.png'
import {useFormik} from "formik";
import {schema} from "../../schema/schema"
import googleIcon from '../../assets/webAssets/googleIcon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from '../../slices/auth/AuthSlice';
import { resetAuthState } from "../../slices/auth/AuthSlice";



const SignUp = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const {loading, response, error} = useSelector((state) => state.auth)

  const formik = useFormik({
    initialValues:{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        }
        dispatch(signupThunk(userData));
    }
  })

  useEffect(() => {
    if (response?.success) {
      toast.success(response.message || "Signup Successful!");
      dispatch(resetAuthState());
      navigate(`/email/${response.data.token}?type=verify`)
    } else if (response && !response.success) {
      toast.error(response.message || "Something went wrong!");
      dispatch(resetAuthState());
    } else if (error) {
      toast.error(error);
      dispatch(resetAuthState());
    }
  }, [response, error]);


    const [isPasswordVisibleFirst, setIsPasswordVisibleFirst] = useState(false);
    const [isPasswordVisibleSecond, setIsPasswordVisibleSecond] = useState(false)
    const passwordInputRefFirst = useRef(null);
    const passwordInputRefSecond = useRef(null);
    const showPasswordFirst = (e) => {
      if(isPasswordVisibleFirst){
        e.currentTarget.classList.remove("ri-eye-off-line")
        e.currentTarget.classList.add("ri-eye-line")
        setIsPasswordVisibleFirst(false)
      }
      else{
        e.currentTarget.classList.remove("ri-eye-line")
        e.currentTarget.classList.add("ri-eye-off-line")
        setIsPasswordVisibleFirst(true)
      }
    }

    const showPasswordSecond = (e) => {
      if(isPasswordVisibleSecond){
        e.currentTarget.classList.remove("ri-eye-off-line")
        e.currentTarget.classList.add("ri-eye-line")
        setIsPasswordVisibleSecond(false)
      }
      else{
        e.currentTarget.classList.remove("ri-eye-line")
        e.currentTarget.classList.add("ri-eye-off-line")
        setIsPasswordVisibleSecond(true)
      }
    }

  return (
    <div className='flex items-center sm:justify-center flex-col lg:flex-row  w-full max-w-[1700px] mx-auto  min-h-screen  py-12 sm:py-0 lg:my-0 '>

      <div className='hidden lg:flex items-center  justify-center text-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 h-screen min-h-[720px] w-[50%] lg:w-[] xl:w-[40%] relative overflow-hidden shadow-2xl'>

            {/* Animated Background Elements */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white opacity-10  blur-3xl animate-float-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-indigo-400 opacity-25 rounded-full blur-2xl animate-float-medium"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 opacity-15 rounded-full blur-3xl animate-pulse-slow"></div>
            
            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white rounded-lg transform rotate-45"></div>
              <div className="absolute bottom-16 left-16 w-12 h-12 border border-white rounded-full"></div>
              <div className="absolute top-1/3 left-10 w-8 h-8 border border-white transform rotate-12"></div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute top-1/4 right-1/4 text-white opacity-20 animate-bounce-slow">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="absolute bottom-1/3 left-1/4 text-white opacity-20 animate-bounce-medium">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>

            {/* Content */}
            <div className='relative z-10 p-10 max-w-md'>
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              <h2 className='text-white text-4xl font-bold leading-tight mb-4'>
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Circle</span>,<br />
                Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Moments</span>
              </h2>
              
              <p className='text-white text-lg opacity-90 mb-8 leading-relaxed'>
                Connect instantly with friends and grow your network in a modern, seamless way.
              </p>
              
              <div className="flex justify-center space-x-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div 
                      key={item}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                <p className="text-white text-sm opacity-70">
                  Join <span className="font-semibold">10,000+</span> users already connected
                </p>
              </div>
            </div>
          </div>



      <div className='flex   items-center  lg:justify-center flex-col w-full lg:h-full lg:w-[70%] xl:w-[60%] '>
          <div className='flex flex-col items-center text-center gap-[0.6rem] sm:gap-2  sm:mt-10 lg:mt-0 '>
            <div className='flex justify-center items-center gap-2 '>
              <img src={logo} alt='Logo Image' className='w-[3.3rem] h-[3.3rem] sm:h-[3rem] sm:w-[3rem]' />
              <h1 className='text-[2.3rem] leading-14  font-bold text-[#0266FF] sm:text-[3rem]'>ConnectO</h1>
            </div>
            <p className='text-[1.1rem] w-[90%] lg:hidden  sm:text-[1.3rem] '>Build your circle, share your moments, and connect instantly.</p>
        </div>
        <div className='mt-6  lg:mt-3 p-6 py-9 border-2 border-blue-500 rounded-3xl w-[85%]  sm:mb-4'>
          <form className=' flex flex-col gap-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col sm:flex-row gap-3'> 

                <div className='sm:w-[50%]'>
                  <input type='text' name='firstName' placeholder='First Name' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}   className='border-1 border-blue-500 text-[0.9rem] sm:text-[1.05rem] p-2 py-3 rounded-md w-full outline-none'/>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className='text-red-500 text-[0.85rem] sm:text-[0.95rem] mt-1'>{formik.errors.firstName}</p>
                  )}
                </div>
                <div className='sm:w-[50%]'>
                  <input type='text' name='lastName' placeholder='Last Name' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}   className='border-1 border-blue-500 text-[0.9rem] sm:text-[1.05rem] p-2 py-3 w-full outline-none rounded-md'/>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className='text-red-500 text-[0.85rem] sm:text-[0.95rem] mt-1'>{formik.errors.lastName}</p>
                  )}
                </div>
              
            </div>

            <div className='w-full'>
              <input type='email' name='email' placeholder='Enter your email'  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}   className='border-1 border-blue-500 text-[0.9rem] sm:text-[1.05rem] p-3 py-3 w-full outline-none rounded-md'/>
              {formik.touched.email && formik.errors.email && (
                    <p className='text-red-500 text-[0.85rem] sm:text-[0.95rem] mt-1'>{formik.errors.email}</p>
                )}
            </div>

            <div className='w-full'>
              <div className='relative'>
                <input  ref={passwordInputRefFirst} type={isPasswordVisibleFirst ? "text" : "password"} name='password' placeholder='Enter Password'  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   className='border-1 border-blue-500 text-[0.9rem] sm:text-[1.05rem] py-3 p-3 w-full outline-none rounded-md'/>
                <i onClick={(e)=> {showPasswordFirst(e)}} className="ri-eye-line absolute top-[50%] right-[12px] text-xl lg:text-[1.4rem] translate-y-[-50%] text-gray-500 cursor-pointer"></i>
              </div>
              {formik.touched.password && formik.errors.password && (
                    <p className='text-red-500 text-[0.85rem] sm:text-[0.95rem] mt-1'>{formik.errors.password}</p>
                )}
            </div>

            <div className='w-full'>
              <div className='relative'>
                <input ref={passwordInputRefSecond} type={isPasswordVisibleSecond ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password'  value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}   className='border-1 border-[var(--blue-color)]  text-[0.9rem] sm:text-[1.05rem] py-3 p-3  w-full outline-none rounded-md'/>
                <i onClick={(e)=> {showPasswordSecond(e)}} className="ri-eye-line absolute top-[50%] right-[12px] text-xl lg:text-[1.4rem] translate-y-[-50%] text-gray-500 cursor-pointer"></i>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className='text-red-500 text-[0.85rem] sm:text-[0.95rem] mt-1'>{formik.errors.confirmPassword}</p>
                )}
            </div>

             <div className='flex flex-col gap-3 sm:flex-row-reverse mt-3 lg:mt-6 lg:flex-col xl:flex-row-reverse'>
                <button
                  type="submit"
                  disabled={loading} 
                  className={`w-full p-3 lg:p-[0.9rem] mt-6 sm:mt-0 text-[0.9rem] sm:text-[1.05rem] font-semibold rounded-lg cursor-pointer flex items-center justify-center gap-2
                    ${
                      loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-all duration-200`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Processing..." : "Sign up"}
                </button>

              <div className='w-full flex justify-center items-center gap-2 bg-white border-1  p-3 rounded-lg border-gray-300 cursor-pointer'>
                <img src={googleIcon} alt='Google Icon' className='w-[1.3rem] sm:w-[1.4rem]' />
                <p className='font-semibold text-[0.9rem] sm:text-[1.05rem]'>Signup with Google</p>
              </div>
             </div>
          </form>

        </div>
      <h5 className='text-[0.95rem] sm:text-[1.18rem] mt-3 pb-5 sm:pb-5 sm:mt-0'>Already have an Account?? <NavLink to='/login'><span className='text-[#0266FF] font-semibold '>Login</span></NavLink> </h5>
      </div>
    </div>
  )
}

export default SignUp
