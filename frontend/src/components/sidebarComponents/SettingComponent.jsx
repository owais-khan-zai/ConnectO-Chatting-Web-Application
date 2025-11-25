import React from 'react'
import logo from '../../assets/webAssets/logo.png'
import ThemeToggleButton from '../../ui/ThemeToggleBtn';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../../slices/sidebarNavigation/SidebarNavigationSlice'


const SettingPage = () => {

  const dispatch = useDispatch()
    const previousTab = useSelector(state => state.sidebarNavigation.previousTab);
    const backHandler = () =>{
       dispatch(setActiveTab(previousTab || "Chat"));
    }
  
  const settingsOptions = [
                            {
                              id: 1,
                              icon: "ri-user-3-line",
                              name: "Account",
                              more: "Manage privacy and security"
                            },
                            {
                              id: 2,
                              icon: "ri-chat-3-line",
                              name: "Chats",
                              more: "Customize chats, and backup"
                            },
                            {
                              id: 3,
                              icon: "ri-notification-3-line",
                              name: "Notifications",
                              more: "Control message and alerts"
                            },
                            {
                              id: 4,
                              icon: "ri-database-2-line",
                              name: "Data Management",
                              more: "Check storage and media usage"
                            },
                            {
                              id: 5,
                              icon: "ri-sun-line",
                              name: "Theme",
                              more: "Switch between light and dark mode"
                            },
                            {
                              id: 6,
                              icon: "ri-questionnaire-line",
                              name: "Help",
                              more: "Get support and app info"
                            },
                    ];


  return (
    <div className='w-full h-full bg-[var(--bg-color)] flex flex-col items-center '>
        <div className='flex items-center gap-5 sm:gap-6 bg-[var(--light-shade)] text-[var(--dark-shade)] px-4 py-4 w-full'>
            <div className='bg-[var(--blue-color)] p-[4.5px] px-[8px] rounded-full' onClick={backHandler}>
                <i className="ri-arrow-left-line text-[1rem] sm:text-[1.6rem] font-semibold cursor-pointer text-white"></i>
            </div>
            <h5 className='text-[1.6rem] sm:text-[1.8rem] font-semibold'>Setting</h5>
        </div>

        <div className='flex w-full px-4 py-[18px] pb-[7px] sm:py-[20px] sm:pb-[10px] items-center gap-[8px]'>
            <img src={logo} alt='Profile Image' className='w-[6.3rem] sm:w-[7.5rem]'/>
            <div className='flex flex-col gap-[5px] sm:gap-[7px] w-full overflow-hidden '>
                <h4 className='font-semibold text-[1.2rem] sm:text-[1.3rem] leading-none'>Website Testing</h4>
                <p className='whitespace-wrap  text-[0.9rem] sm:text-[1.08rem] text-[var(--dark-shade)]'>This Paragrap is only for the testng purpose </p>
            </div>
        </div>
        
        <div className='flex flex-col w-full px-[20px] mt-[8px] sm:mt-[0px] pb-[70px] sm:pb-[50px]'>
          {settingsOptions.map((item, index)=>{
              return <div key={index} className='flex mt-[18px] sm:mt-[19px] items-center justify-between  w-full '>
                      <div className='flex items-center gap-[10px] sm:gap-4 cursor-pointer'>
                        <i className={`${item.icon} text-[29px] sm:text-[31px] text-[var(--blue-color)]`}></i>
                        <div className='flex flex-col   '>
                          <h5 className='font-semibold text-[16px]  sm:text-[18px]'>{item.name}</h5>
                          <p className='text-[15px] text-[var(--dark-shade)] sm:text-[17px]'>{item.more}</p>
                        </div>
                      </div>  
                      {item.name === "Theme" && <div className=''><ThemeToggleButton/></div>}
                </div>
          })}
        </div>

    </div>
  )
}

export default SettingPage
