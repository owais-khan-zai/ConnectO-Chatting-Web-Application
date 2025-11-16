import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserThunk } from '../../slices/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../../utils/Loader'
import { sendRequestThunk, withdrawRequestThunk } from '../../slices/friendRequest/FriendRequestSlice'

const MemberComponent = () => {

    const dispatch = useDispatch()

    const [RequestedIds, setRequestedIds] = useState([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [pendingUserId , setPendingUserId] = useState(null);

    // yha destructure krky seperate name dia takay destructure krty hue same names ki waja sy error na aye 
    const {
        response: userResponse,
        loading: userLoading,
        error: userError
    } = useSelector((state) => state.user)

    const {
        response: friendResponse,
        loading: friendLoading,
        error: friendError
    } = useSelector((state) => state.friendRequest)


    useEffect(()=>{
        dispatch(getUserThunk());   
    },[dispatch])

    const users = userResponse?.data || []

    useEffect(()=>{
        if(userError){
            toast.error(userError)
        }

        if(friendError){
            toast.error(friendError)
        }
    },[userError, friendError, friendResponse ])


    const requestBtnHandler = (id) => {
        const data = {
            receiverId: id
        }
        dispatch(sendRequestThunk(data)); 
        setRequestedIds((prev) => [...prev, id])
    }

    const pendingBtnHandler = (id) => {
        setPendingUserId(id)
        setIsPopUpOpen(true)

    }

    const cancelPendingBtn = () => {
        setPendingUserId(null)
        setIsPopUpOpen(false)
    }


    const withdrawPendingBtn = () => {
        const data = {
            receiverId: pendingUserId
        }
        dispatch(withdrawRequestThunk(data))
        const filterRequest = RequestedIds.filter((arrayID)=> arrayID !== pendingUserId)
        setRequestedIds(filterRequest)
        setPendingUserId(null)
        setIsPopUpOpen(false)
    }


  return (
    <div className='w-full h-full bg-[var(--bg-color)] flex flex-col items-center pt-[3rem] sm:pt-[40px] pb-[20vw] sm:pb-[100px] '>

        <div className={`fixed top-0 left-0 w-full h-full ${isPopUpOpen ? "block" : "hidden"} z-10 bg-black/30`}>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-[var(--bg-color)] text-[var(--text-color)] w-[85%] max-w-[320px] rounded-md'>
                <h4 className='text-[1.3rem] sm:text-[1.5rem] font-semibold'>Conformation</h4>
                <p className='text-[var(--dark-shade)] text-[0.95rem] sm:text-[1rem] mt-1'>Are you sure to withdraw this request?</p>
                <div className='flex justify-between w-full  pt-4'>
                    <button onClick={()=>cancelPendingBtn()} className='border-2 rounded-full w-[48%] sm:text-[1.1rem] text-[var(--dark-shade)] py-2 font-semibold cursor-pointer'>Cancel</button>
                    <button onClick={() => withdrawPendingBtn()} className='bg-[var(--blue-color)] text-white w-[48%] sm:text-[1.1rem]  py-2 rounded-full font-semibold cursor-pointer'>Withdraw</button>
                </div>
            </div>
        </div>

        <div className='relative w-full grid grid-cols-2 md:grid-cols-3  mt-[1rem] sm:mt-9 gap-[0.1rem] px-[0.5rem] pb-[6rem] sm:pb-[120px]'>

            {userLoading && <Loader/>}

            {!userLoading && !userError && users.map((user, index)=>{
                let IsRequested = RequestedIds.includes(user._id)
                return <div key={index} className='border-1 mt-[0.8rem]  sm:mt-[12px] mx-auto w-[96%] pt-[1.5rem] sm:pt-[30px] sm:pb-[22px] pb-[1.2rem] border-gray-400 text-center flex flex-col justify-between items-center rounded-lg'>
                        <div className=''>
                            <img src={user.profilePic} alt='Profile Pic' className='rounded-full w-[5.7rem] mx-auto sm:w-32 '/>
                            <h4 className='text-[1.1rem] sm:text-[1.3rem] font-semibold mt-2 capitalize'>{user.firstName} {user.lastName}</h4>
                            <p className='whitespace-pre-wrap w-[90%] sm:w-[90%] text-[0.88rem] sm:text-[1rem] text-[var(--dark-shade)] mx-auto'>{user.about}</p>
                        </div>
                        {IsRequested ? <button onClick={() => pendingBtnHandler(user._id)} className='border-2 border-gray-600 text-[var(--text-color)] flex gap-1 justify-center  w-[80%] mt-[0.9rem] cursor-pointer rounded-full p-[0.5rem] text-[0.85rem] sm:p-[0.65rem] max-w-[220px] sm:mt-3 sm:text-[16px] font-semibold'><i className="ri-time-line text-[0.9rem] sm:text-[1.05rem]"></i>Pending</button> 
                        :  <button onClick={()=>requestBtnHandler(user._id)} className='bg-[#0266FF] border-2 border-transparent text-white w-[80%] mt-[0.9rem] cursor-pointer rounded-full p-[0.5rem] text-[0.85rem] sm:p-[0.6rem] max-w-[220px] sm:mt-3 sm:text-[16px]  font-semibold'>Request</button>
                        }
                        
                    </div>
            })}
        </div>
    </div>
  )
}

export default MemberComponent
