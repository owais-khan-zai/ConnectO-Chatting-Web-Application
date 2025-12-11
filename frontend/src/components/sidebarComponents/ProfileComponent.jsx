import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../../slices/sidebarNavigation/SidebarNavigationSlice'
import { loggedInUserThunk } from '../../slices/user/userSlice'
import Loader from '../../utils/Loader'
import { Formik, Form, Field, ErrorMessage } from "formik";
import profileSchema from "../../schema/profileUpdateValidationSchema"


const ProfileComponent = () => {
    const dispatch = useDispatch()
    const previousTab = useSelector(state => state.sidebarNavigation.previousTab);
    const backHandler = () =>{
       dispatch(setActiveTab(previousTab || "Chat"));
    }


    useEffect(()=>{
        dispatch(loggedInUserThunk());   
    },[dispatch])

    const {loggedInUserApiResponse , loggedInUserApiLoading, loggedInUserApiError} = useSelector(state => state.user);

    const userInfo = {
        firstName: loggedInUserApiResponse?.data?.firstName || "",
        lastName: loggedInUserApiResponse?.data?.lastName || "",
        about: loggedInUserApiResponse?.data?.about || "",
        Age: loggedInUserApiResponse?.data?.age || "",
        profilePic: loggedInUserApiResponse?.data?.profilePic || "",
        email: loggedInUserApiResponse?.data?.email || "",
        isVerified: loggedInUserApiResponse?.data?.isVerified || false,
    }

    // const [UserFirstName, setUserFirstName] = useState(null)
    // const [UserLastName, setUserLastName] = useState(null)
    // const [UserAbout, setUserAbout] = useState(null)
    // const [UserProfilePic, setUserProfilePic] = useState(null)
    // const [UserEmail, setUserEmail] = useState(null)
    // const [UserAge, setUserAge] = useState(null)
    // const [IsUserVerified, setIsUserVerified] = useState(false)

    // const [UserFullName, setUserFullName] = useState(null)

    useEffect(()=>{
        console.log("res", loggedInUserApiResponse);
        // setUserFirstName(loggedInUserApiResponse?.data?.firstName)
        // setUserLastName(loggedInUserApiResponse?.data?.lastName)
        // setUserFullName(loggedInUserApiResponse?.data?.firstName + " " + loggedInUserApiResponse?.data?.lastName)
        // setUserAbout(loggedInUserApiResponse?.data?.about)
        // setUserProfilePic(loggedInUserApiResponse?.data?.profilePic)
        // setUserEmail(loggedInUserApiResponse?.data?.email)
        // setUserAge(loggedInUserApiResponse?.data?.age)
        // setIsUserVerified(loggedInUserApiResponse?.data?.isVerified)
    },[loggedInUserApiResponse])


    const [PopUp, setPopUp] = useState(false)


    
    const cancelBtn = () =>{
        setPopUp(null)
    }


// age ko sahi sy handle krna hy saht api ka kam krna hy 

  return (
    <div className='w-full h-full bg-[var(--bg-color)]' >

        {/* Popup modal Code Start Here */}    
            <Formik
                enableReinitialize={true} 
                initialValues={{
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    about: userInfo.about,
                    Age: userInfo.Age,
                }}
                validationSchema={profileSchema}
                onSubmit={(values) => {
                    saveAboutInfo(values); 
                }}
                >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>

                    {/* Popup modal Code Start Here */}    
                    <div className='fixed top-0 left-0 w-full h-full bg-black/40 z-99 '>
                        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-[var(--bg-color)] text-[var(--text-color)] w-[85%] max-w-[410px] rounded-md'>

                            {/* ---------- Name Section ---------- */}
                            <div>
                                <div className='flex gap-[7px] items-center mb-1 text-[1.2rem] text-[var(--blue-color)]'>
                                    <i className="ri-user-line relative pt-[1.2px]"></i>
                                    <h3 className='leading-none font-semibold italic'>Name</h3>
                                </div>

                                <Field
                                    type='text'
                                    name='firstName'
                                    value={values.firstName}
                                    onChange={(e)=>{
                                        handleChange(e)           
                                    }}
                                    className='border-l-4 border-blue-500 bg-blue-50 w-full text-[1.12rem] sm:text-[1.16rem] py-2 px-2 outline-none'
                                />
                                <ErrorMessage
                                    name='firstName'
                                    component="div"
                                    className='text-red-500 text-sm mt-1'
                                />

                                <Field
                                    type='text'
                                    name='lastName'
                                    value={values.lastName}
                                    onChange={(e)=>{
                                        handleChange(e)
                                    }}
                                    className='border-l-4 border-blue-500 bg-blue-50 w-full text-[1.12rem] sm:text-[1.16rem] py-2 mt-2 px-2 outline-none'
                                />
                                <ErrorMessage
                                    name='lastName'
                                    component="div"
                                    className='text-red-500 text-sm mt-1'
                                />
                            </div>

                            {/* ---------- About Section ---------- */}
                            <div className='mt-4'>
                                <div className='flex gap-[7px] items-center mb-1 text-[1.2rem] text-[var(--blue-color)]'>
                                    <i className="ri-chat-smile-ai-line text-[var(--blue-color)] relative pt-[1px]"></i>
                                    <h3 className='leading-none font-semibold italic'>About</h3>
                                </div>

                                <Field
                                    type='text'
                                    name='about'
                                    value={values.about}
                                    onChange={(e)=>{
                                        handleChange(e)
                                    }}
                                    className='border-l-4 border-blue-500 bg-blue-50 w-full text-[1.12rem] sm:text-[1.16rem] py-2 px-2 outline-none'
                                />
                                <ErrorMessage
                                    name='about'
                                    component="div"
                                    className='text-red-500 text-sm mt-1'
                                />
                            </div>

                            {/* ---------- Age Section ---------- */}
                            <div className='mt-4'>
                                <div className='flex gap-[7px] items-center mb-1 text-[1.2rem] text-[var(--blue-color)]'>
                                    <i className="ri-calendar-2-line text-[var(--blue-color)] relative pt-[1px]"></i>
                                    <h3 className='leading-none font-semibold italic'>Age</h3>
                                </div>

                                <Field
                                    type='number'
                                    name='Age'
                                    value={values.Age}
                                    onChange={(e)=>{
                                        handleChange(e)
                                    }}
                                    className='border-l-4 border-blue-500 bg-blue-50 w-full text-[1.12rem] sm:text-[1.16rem] py-2 px-2 outline-none'
                                />
                                <ErrorMessage
                                    name='Age'
                                    component="div"
                                    className='text-red-500 text-sm mt-1'
                                />
                            </div>

                            {/* ---------- Buttons ---------- */}
                            <div className='flex justify-between w-full pt-7 sm:pt-6'>
                                <button
                                    type='button'
                                    onClick={() => cancelBtn()}
                                    className='border-2 rounded-full w-[49%] sm:text-[1.1rem] text-[var(--dark-shade)] py-2 font-semibold cursor-pointer'
                                >
                                    Cancel
                                </button>

                                <button
                                    type='submit'
                                    className='bg-[var(--blue-color)] text-white w-[49%] sm:text-[1.1rem] py-2 rounded-full font-semibold cursor-pointer'
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* Popup modal Code Ends Here */}

                </Form>
                )}
                </Formik>

        {/* Popup modal Code Ends Here */}

        <div className='flex items-center gap-6 sm:gap-6 bg-[var(--light-shade)] text-[var(--dark-shade)] px-4 py-4 w-full'>
            <div
                className="bg-[var(--blue-color)] p-[4.5px] px-[8px] sm:px-[10px] rounded-full"
                onClick={backHandler}
                >
                <i className="ri-arrow-left-line text-[1rem] sm:text-[1.3rem] font-semibold cursor-pointer text-white"></i>
            </div>
            <h5 className='text-[1.6rem] sm:text-[1.85rem] font-semibold'>Profile</h5>
        </div>
        {loggedInUserApiLoading && <Loader/>}
        {!loggedInUserApiLoading && !loggedInUserApiError && <div className='w-full h-full bg-[var(--bg-color)] flex flex-col items-center '>
            <div className='w-full flex justify-end  px-[8px] sm:px-[10px] text-[var(--blue-color)] mt-3'>
                <div onClick={()=>{}} className='flex justify-center items-center w-fit bg-blue-100 p-3 px-3 rounded-full gap-1 text-[14px] sm:text-[17px] cursor-pointer'>
                    <i className="ri-pencil-fill "></i>
                    <h3 className='font-semibold'>Edit Profile</h3>
                </div>
            </div>
            <div className='rounded-full w-[11.3rem] sm:w-[13rem] mt-[2.5rem] sm:mt-5 relative '>
                <img src={userInfo.profilePic} alt='Profile Image' className='w-full h-full rounded-full z-2 relative'/>
                <div className='absolute bottom-3 right-4 sm:right-5 sm:bottom-4 border-1 border-white z-10 bg-[var(--blue-color)] cursor-pointer text-white w-[2.5rem] h-[2.5rem] sm:w-[2.4rem] sm:h-[2.4rem] rounded-full flex items-center justify-center'>
                    <i className="ri-camera-ai-fill text-[1.15rem] sm:text-[1.1rem]"></i>
                </div>
            </div>

            <div className='mt-[2rem] sm:mt-9 min-h-[320px] w-full px-4 sm:px-5 '>
                <form className='text-[var(--dark-shade)] text-[1.8rem] sm:text-[1.9rem] flex flex-col gap-4'>
                    <div className='flex items-center justify-between w-full  border-b-1 border-gray-300 py-[0.6rem] sm:py-[0.9rem]'>
                        <i className="ri-user-line text-[var(--blue-color)]"></i>
                        <div className='flex justify-between w-full items-center'>
                            <div className='flex flex-col px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                                <label className='italic font-semibold text-[1rem] sm:text-[1.1rem] leading-none'>Name</label>
                                <input type='text' value={userInfo.firstName + " " + userInfo.lastName}  className='text-[0.9rem] sm:text-[1.1rem] leading-none outline-none text-gray-600'/>
                            </div>
                            
                        </div>
                    </div>
                    <div className='flex items-center justify-between w-full border-b-1  border-gray-300 py-[0.6rem] sm:py-[0.8rem]'>
                        <i className="ri-chat-smile-ai-line text-[var(--blue-color)]"></i>
                        <div className='flex justify-between w-full  items-center'>
                            <div className='flex flex-col px-[0.8rem] sm:px-5 w-full gap-[0.35rem] sm:gap-1'>
                                <label className='italic font-semibold text-[1rem] sm:text-[1.1rem]  leading-none'>About</label>
                                <input type='text' value={userInfo.about} className='whitespace-pre-wrap text-[0.9rem] sm:text-[1.1rem] leading-none outlin-none'/>
                            </div>
                            </div>
                    </div>
                    <div className='flex items-center  w-full border-b-1 border-gray-300 py-[0.6rem] sm:py-[0.8rem]'>
                        <i className="ri-mail-line text-[var(--blue-color)]"></i>
                        <div className='flex flex-col  px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                            <label className='italic font-semibold text-[1rem] sm:text-[1.1rem] leading-none'>Email</label>
                            <input type='Email' readOnly value={userInfo.email} className='whitespace-pre-wrap select-none cursor-default text-[0.9rem] sm:text-[1.1rem] leading-none outline-none'/>
                        </div>
                    </div>
                    <div className='flex items-center  w-full border-b-1  border-gray-300 py-[0.6rem] sm:py-[0.8rem]'>
                        <i className="ri-calendar-2-line text-[var(--blue-color)]"></i>
                        <div className='flex flex-col  px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                            <label className='italic font-semibold text-[1rem] sm:text-[1.1rem] leading-none'>Age</label>
                            <input type='number' readOnly value={userInfo.age} className='whitespace-pre-wrap select-none cursor-default text-[0.9rem] sm:text-[1.1rem] leading-none outline-none'/>
                        </div>
                    </div>
                    <div className='flex items-center  w-full py-[0.3rem] sm:py-[0.5rem] mb-5'>
                        {userInfo.isVerified == true ? <i class="ri-verified-badge-line text-[var(--blue-color)]"></i>: <i className="ri-spam-2-line text-[var(--blue-color)]"></i> }
                        <div className='flex flex-col  px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                            <label className='italic font-semibold text-[1rem] sm:text-[1.1rem] leading-none'>{userInfo.isVerified == true ? "Verified" : "Not Verified"}</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>}
    </div>
  )
}

export default ProfileComponent
