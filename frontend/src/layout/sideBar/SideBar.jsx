import React, { useEffect, useState } from 'react'
import ProfileComponent from '../../components/sidebarComponents/ProfileComponent';
import SettingComponent from '../../components/sidebarComponents/SettingComponent';
import MemberComponent from '../../components/sidebarComponents/MemberComponent';
import ChatsComponent from '../../components/sidebarComponents/ChatsComponent';
import FriendRequestComponent from '../../components/sidebarComponents/FriendRequestComponent';
import logo from "../../assets/webAssets/logo.png";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../slices/sidebarNavigation/SidebarNavigationSlice';


const SideBar = () => {

    const dispatch = useDispatch();
    const activeTab = useSelector((state)=> state.sidebarNavigation.activeTab)

    const [IsMenuOpen, setIsMenuOpen] = useState(false);

    const ActiveTabHandler = (e) =>{
        
        const ele = e.currentTarget.querySelector("h6").innerText;
        if (ele) dispatch(setActiveTab(ele));
    }

    const hideLayout = activeTab === "Chat" || activeTab === "Status" || activeTab === "Member";

    useEffect(() => {
        if (IsMenuOpen) {
            gsap.to(".menuList", { right: 0, duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(".menuList", { right: "-100%", duration: 0.3, ease: "power2.in" });
        }
    }, [IsMenuOpen]);

    useEffect(()=>{
        setIsMenuOpen(false)
    },[activeTab])

    const handleMenuList = () => {
        const isOpen = !IsMenuOpen;
        setIsMenuOpen(isOpen);
    };

    const menuTabsHandler = (e) =>{
        const ele = e.currentTarget.innerText.trim();
        if (ele) {
            dispatch(setActiveTab(ele));
        }
    }
    

  return (
    <div className='w-full  h-screen relative'>

        {hideLayout && <div className='  fixed w-full top-0 z-100'>
            <div className="w-full flex justify-between items-center p-3  bg-[var(--bg-color)]">
            <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="Logo" className="w-[2.7rem] sm:w-[3.2rem]" />
            <h5 className="text-[var(--blue-color)] text-[1.8rem] sm:text-[2.2rem] font-semibold">
                ConnectO
            </h5>
            </div>
            
            <div className="flex gap-2 items-center relative ">
                <i
                    onClick={handleMenuList}
                    className="ri-more-2-fill  text-[1.5rem] sm:text-[29px] text-[var(--blue-color)] cursor-pointer"
                ></i>
        </div>
        </div>

        {/* Menu */}
        <ul
            className={` menuList h-full w-[70%]  overflow-y-auto flex-col gap-1 overflow-hidden top-0 right-[-100%] bg-[var(--bg-color)] shadow-md text-[1.05rem] sm:text-[18px]  rounded-md fixed`}
            >
                <li className='w-full text-end p-3 py-[0.4rem] sm:py-2 '><i onClick={handleMenuList} className="ri-close-line cursor-pointer text-[1.8rem] sm:text-[2rem] text-gray-700"></i></li>
                <li onClick={(e)=>menuTabsHandler(e)} className="cursor-pointer text-center px-9 sm:px-12 mt-[1rem] sm:mt-3 py-[0.8rem] sm:py-3 transition-all duration-200 border-b-1 border-t-1 border-gray-300 hover:bg-[var(--blue-color)] hover:text-[var(--bg-color)] hover:font-semibold">
                Profile
                </li>
                <li onClick={(e)=>menuTabsHandler(e)} className="cursor-pointer text-center px-9 py-[0.8rem] sm:py-3 sm:px-12 transition-all duration-200 border-b-1  border-gray-300 hover:bg-[var(--blue-color)] hover:text-[var(--bg-color)] hover:font-semibold">
                Friend Request
                <div></div>
                </li>
                <li onClick={(e)=>menuTabsHandler(e)} className="cursor-pointer text-center px-9 py-[0.8rem] sm:py-3 sm:px-12 transition-all duration-200 border-b-1  border-gray-300 hover:bg-[var(--blue-color)] hover:text-[var(--bg-color)] hover:font-semibold">
                Setting
                </li>
            </ul>
        {/* Menu ends */}
        </div>
        
        }


        <div className={`w-full h-full relative  flex flex-col justify-between  ${activeTab === "Chat" ? " " : "hidden"}`}>
            <ChatsComponent/>
        </div>

        {/* profile page */}
        <div className={`w-full h-full absolute top-0 z-4  ${activeTab === "Profile" ? " " : "hidden"}`}>
            <ProfileComponent/>
        </div>

        {/* setting page */}
        <div className={`w-full h-full absolute top-0 z-4  ${activeTab === "Setting" ? " " : "hidden"}`}>
            <SettingComponent/>
        </div>
        
        {/* member page */}
        <div className={`w-full h-full absolute top-0 z-4 ${activeTab === "Member" ? " " : "hidden"}`}>
            <MemberComponent/>
        </div>

        <div className={`w-full h-full absolute top-0 z-4 ${activeTab === "Friend Request" ? " " : "hidden"}`}>
            <FriendRequestComponent/>
        </div>

        {hideLayout && <div className=' bg-[var(--bg-color)] w-full  h-[4.4rem]  sm:h-[100px] shadow-[0_-4px_10px_rgba(0,0,0,0.04)] z-10 fixed bottom-0 left-0 '>
            <ul className='flex justify-between items-center w-[70%] max-w-[350px] mx-auto  text-[1.3rem] sm:text-[23px] transition-all duration-200 text-[var(--blue-color)] py-[0.5rem] sm:py-[10px]'>
                <li onClick={(e) => ActiveTabHandler(e)} className='flex flex-col items-center gap-1'><i className={`ri-chat-ai-line cursor-pointer transition-all duration-200 ${ activeTab == "Chat" ? " p-[0.5rem] px-[0.8rem] sm:p-[8px] sm:px-[14px] bg-[var(--blue-shade)]" : "text-[1.7rem] sm:text-[32px] bg-white"} rounded-full`}></i> <h6 className={`font-semibold text-[0.85rem] sm:text-[16px] leading-none transition-all duration-200 ${activeTab != "Chat" && "hidden"}`}>Chat</h6></li>
                <li onClick={(e) => ActiveTabHandler(e)} className='flex flex-col items-center gap-1'><i className={`ri-dvd-ai-line cursor-pointer transition-all duration-200  ${ activeTab == "Status" ? "p-[0.5rem] px-[0.8rem] sm:p-[8px] sm:px-[14px] bg-[var(--blue-shade)]" : "text-[1.7rem] sm:text-[32px] bg-white"} rounded-full`}></i> <h6 className={`font-semibold text-[0.85rem] sm:text-[16px] leading-none transition-all duration-200 ${activeTab != "Status" && "hidden"}`}>Status</h6></li>
                <li onClick={(e) => ActiveTabHandler(e)} className='flex flex-col items-center gap-1'><i className={`ri-user-add-line cursor-pointer  transition-all duration-200  ${ activeTab == "Member" ? "p-[0.5rem] px-[0.8rem] sm:p-[8px] sm:px-[14px] bg-[var(--blue-shade)]" : "text-[1.7rem] sm:text-[32px] bg-white"} rounded-full`}></i> <h6 className={`font-semibold text-[0.85rem] sm:text-[16px] leading-none transition-all duration-200 ${activeTab != "Member" && "hidden"}`}>Member</h6></li>
            </ul>
        </div>}

    </div>
  )
}
export default SideBar
