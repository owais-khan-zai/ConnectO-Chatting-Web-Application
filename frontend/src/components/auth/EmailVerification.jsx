import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/webAssets/logo.png'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import googleIcon from '../../assets/webAssets/googleIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import { resendOtpThunk, verifyEmailThunk } from '../../slices/auth/AuthSlice'
import { resetAuthState } from '../../slices/auth/AuthSlice'


const EmailVerificaiton = () => {

    const {token} = useParams()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [activeAction, setActiveAction] = useState(null);

    const {loading, error, response} = useSelector((state)=>state.auth)

    const [isCodeFieldError, setIsCodeFieldError] = useState(false)

    const [timer, setTImer ] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
    const inputRefs = useRef([]);

    useEffect(()=>{
        let interval;

        if(isResendDisabled && timer > 0){
            interval = setInterval(()=>{
                setTImer((prev) => prev - 1)
            }, 1000)
        }
        else if (timer === 0 ){
            setIsResendDisabled(false)
        }

        return () => clearInterval(interval)
    }, [timer, isResendDisabled])

    const resendOtpHandler = () => {
         if(isResendDisabled === false){
            setIsResendDisabled(true)
            setTImer(60)
            const data = {
                token,
                type
            }
            setActiveAction("resend");
            dispatch(resendOtpThunk(data))
         }
    }

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^\d?$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        }
    };

    const submitHandler = (e) =>{
        e.preventDefault()
        const otpCode = otp.toString().split(",").join("")
        
        if(otpCode === ""){
            setIsCodeFieldError(true)
        }
        else{
            setIsCodeFieldError(false)
            const data = {
                token,
                code: otpCode
            }
            setActiveAction("verify");
            dispatch(verifyEmailThunk(data))
        }
    }


    useEffect(() => {
        if (response?.success) {
            if(activeAction === "verify") {
                toast.success(response.message || "Verification Successful!");
                dispatch(resetAuthState());
                navigate('/login')
            }
            else if( activeAction === "resend") {
                toast.success(response.message || "Otp resend successfull")
            }
        } else if (response && !response.success) {
          toast.error(response.message || "Something went wrong!");
          dispatch(resetAuthState());
        } else if (error) {
          toast.error(error);
          dispatch(resetAuthState());
        }
      }, [response, error]);

  return (
    <div className='flex items-center justify-center flex-row-reverse w-full max-w-[1700px] mx-auto min-h-screen  my-4 sm:my-6 lg:my-0'>

         <div className='hidden lg:flex items-center justify-center text-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 h-screen min-h-[720px] w-[50%] lg:w-[40%] xl:w-[45%] relative overflow-hidden shadow-2xl'>

            {/* Animated Background Elements */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white opacity-10 blur-3xl animate-float-slow"></div>
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
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            </div>
            <div className="absolute bottom-1/3 left-1/4 text-white opacity-20 animate-bounce-medium">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </div>

            {/* Content */}
            <div className='relative z-10 p-10 max-w-md'>
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                </div>
                
                <h2 className='text-white text-4xl font-bold leading-tight mb-4'>
                    Verify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Email</span>,<br />
                    Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Account</span>
                </h2>
                
                <p className='text-white text-lg opacity-90 mb-8 leading-relaxed'>
                    We've sent a verification code to your email address. Enter it below to complete your registration.
                </p>
                
                {/* Verification Benefits */}
                <div className="space-y-3 mb-8 text-left">
                    {[
                        "✓ Secure your account",
                        "✓ Access all features",
                        "✓ Connect with friends instantly"
                    ].map((benefit, index) => (
                        <div key={index} className="flex items-center text-white text-sm opacity-90">
                            <span className="mr-2">{benefit}</span>
                        </div>
                    ))}
                </div>

                
                <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                    <p className="text-white text-sm opacity-70">
                        Can't find the code? Check your spam folder or <span className="font-semibold text-cyan-300">resend code</span>
                    </p>
                </div>
            </div>
        </div>



      <div className='flex  items-center justify-center flex-col w-full lg:h-full lg:w-[60%] xl:w-[55%]'>
          <div className='flex flex-col items-center text-center gap-[2vw] sm:gap-2  sm:mt-15 lg:mt-0'>
            <div className='flex justify-center items-center gap-2'>
              <img src={logo} alt='Logo Image' className='w-[3.3rem] h-[3.3rem] sm:h-[3rem] sm:w-[3rem]' />
              <h1 className='text-[2.3rem] leading-14  font-bold text-[#0266FF] sm:text-[3rem]'>ConnectO</h1>
            </div>
            <p className='text-[1.1rem] w-[85%] md:w-[70%]  lg:hidden  sm:text-[1.3rem] '>We've sent a verification code to your email address.</p>
        </div>
        <div className='mt-6 lg:mt-5 p-5 py-8 border-2 border-blue-500 rounded-3xl w-[85%] max-w-[440px] sm:w-[28rem] md:w-[30rem] lg:w-[29rem]  sm:mb-8'>
          <form onSubmit={submitHandler} className=' flex flex-col gap-2 '>

            <div className='flex items-center  gap-2 w-full'>
                 {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="border border-gray-400 w-full sm:h-[4rem] flex text-center rounded-xl outline-none text-[1.8rem] sm:text-[1.5rem] font-semibold text-gray-600"
                    />
                    ))}
            </div>

            <div className='w-full'>
                {isCodeFieldError && <p className='text-red-400 text-[0.85rem] sm:text-[0.95rem] mt-1'>Otp must required</p>}
            </div>

            <div className='w-full flex justify-between mt-1'>
                <h6 className={`text-[0.9rem] sm:text-[1.05rem] text-gray-700`}>Did not get Otp? <span onClick={resendOtpHandler} className={` font-semibold ${isResendDisabled === false ? "text-[var(--blue-color)] cursor-pointer" : "text-blue-300 cursor-default"}`}>{loading && activeAction === "resend" ? "Sending..." : "Resend"}</span></h6>
                <p className='text-[0.9rem] sm:text-[1.05rem] text-gray-700'>00:{String(timer).padStart(2, '0')}</p>
            </div>

             <button
                type="submit"
                disabled={loading} 
                className={`w-full p-3 mt-5 lg:mt-5 text-[0.9rem] sm:text-[1.05rem] font-semibold rounded-lg cursor-pointer flex items-center justify-center gap-2
                    ${
                    loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-all duration-200`}
                >
                {loading && activeAction === "verify" &&  (
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
                {loading && activeAction === "verify" ? "Processing..." : "Verify"}
                </button>

          </form>
        </div>
         <h5 className='text-[0.9rem] sm:text-[1.05rem] mt-5 pb-5 sm:pb-5  sm:mt-0'>Change email address?? <NavLink to='/signup'><span className='text-[#0266FF] font-semibold '>Click here</span></NavLink> </h5>
      </div>
    </div>
  )
}

export default EmailVerificaiton
