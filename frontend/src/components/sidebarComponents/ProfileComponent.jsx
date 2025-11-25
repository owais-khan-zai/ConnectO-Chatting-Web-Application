import React, { useState } from 'react'
import logo from '../../assets/webAssets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../../slices/sidebarNavigation/SidebarNavigationSlice'

const ProfileComponent = () => {
    const dispatch = useDispatch()
    const previousTab = useSelector(state => state.sidebarNavigation.previousTab);
    const backHandler = () =>{
       dispatch(setActiveTab(previousTab || "Chat"));
    }

    const [UserName, setUserName] = useState("Website Logo")
    const [UserAbout, setUserAbout] = useState("This is the testing text which the user write")
  return (
    <div className='w-full h-full bg-[var(--bg-color)] flex flex-col items-center ' >
        <div className='flex items-center gap-6 sm:gap-6 bg-[var(--light-shade)] text-[var(--dark-shade)] px-4 py-4 w-full'>
            <div className='bg-[var(--blue-color)] p-[4.5px] px-[8px] rounded-full' onClick={backHandler}>
                <i className="ri-arrow-left-line text-[1rem] sm:text-[1.6rem] font-semibold cursor-pointer text-white"></i>
            </div>
            <h5 className='text-[1.6rem] sm:text-[1.9rem] font-semibold'>Profile</h5>
        </div>
        <div className='rounded-full w-[11.3rem] sm:w-[14.2rem] mt-[2.5rem] sm:mt-5 relative '>
            <img src={logo} alt='Profile Image' className='w-full h-full rounded-full z-2 relative'/>
            <div className='absolute bottom-3 right-4 sm:right-5 sm:bottom-4 border-1 border-white z-10 bg-[var(--blue-color)] cursor-pointer text-white w-[2.5rem] h-[2.5rem] sm:w-[2.8rem] sm:h-[2.8rem] rounded-full flex items-center justify-center'>
                <i className="ri-camera-ai-fill text-[1.15rem] sm:text-[1.2rem]"></i>
            </div>
        </div>

        <div className='mt-[2rem] sm:mt-9 min-h-[320px] w-full px-4 sm:px-5'>
            <form className='text-[var(--dark-shade)] text-[1.8rem] sm:text-[2.1rem] flex flex-col gap-5'>
                <div className='flex items-center justify-between w-full  border-b-1 border-gray-300 py-[0.6rem] sm:py-[0.9rem]'>
                    <i className="ri-user-3-fill "></i>
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex flex-col px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                            <label className='italic font-semibold text-[1rem] sm:text-[1.15rem] leading-none'>Name</label>
                            <input type='text' value={UserName} onChange={(e)=>setUserName(e.target.value)} className='text-[0.9rem] sm:text-[1.1rem] leading-none outline-none'/>
                        </div>
                        <i className="ri-pencil-fill text-[1.65rem] sm:text-[1.8rem] cursor-pointer"></i>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full border-b-1 border-gray-300 py-[0.6rem] sm:py-[0.8rem]'>
                    <i className="ri-error-warning-line"></i>
                    <div className='flex justify-between w-full  items-center'>
                        <div className='flex flex-col px-[0.8rem] sm:px-5 w-full gap-[0.35rem] sm:gap-1'>
                            <label className='italic font-semibold text-[1rem] sm:text-[1.15rem]  leading-none'>About</label>
                            <input type='text' value={UserAbout} onChange={(e)=>setUserAbout(e.target.value)} className='whitespace-pre-wrap text-[0.9rem] sm:text-[1.1rem] leading-none outlin-none'/>
                        </div>
                            <i className="ri-pencil-fill text-[1.65rem] sm:text-[1.8rem] cursor-pointer"></i>
                        </div>
                </div>
                <div className='flex items-center  w-full border-b-1 border-gray-300 py-[0.6rem] sm:py-[0.8rem]'>
                    <i className="ri-mail-fill"></i>
                    <div className='flex flex-col  px-[0.8rem] sm:px-5 gap-[0.35rem] sm:gap-1'>
                        <label className='italic font-semibold text-[1rem] sm:text-[1.15rem] leading-none'>Email</label>
                        <input type='Email' readOnly value="khanowaiszai@gmail.com" className='whitespace-pre-wrap select-none cursor-default text-[0.9rem] sm:text-[1.1rem] leading-none outline-none'/>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileComponent
