import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../slices/sidebarNavigation/SidebarNavigationSlice";
import {
  getFriendRequestReceiveThunk,
  getFriendRequestSendThunk,
} from "../../slices/friendRequest/GetFriendRequestSlice";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";
import { acceptRequestThunk, rejectRequestThunk } from "../../slices/friendRequest/FriendRequestSlice";


const FriendRequestComponent = () => {
  const [activeState, setActiveState] = useState("Receive");

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [ReceiverUserId, setReceiverUserId] = useState(null);

  const dispatch = useDispatch();
  const previousTab = useSelector(
    (state) => state.sidebarNavigation.previousTab
  );
  const backHandler = () => {
    dispatch(setActiveTab(previousTab || "Chat"));
  };

//   this is for getting the friend requests
  const {
    responseReceiveRequest,
    responseSendRequest,
    receiveRequestLoading,
    sendRequestloading,
    receiveRequesterror,
    sendRequesterror,
  } = useSelector((state) => state.getFriendRequest);

// this is handling loader between two tabs
  const isLoading = 
  (activeState === "Receive" && receiveRequestLoading) ||
  (activeState === "Pending" && sendRequestloading);

//   this for friend request canceling from friendrequest slice
    const { response, loading, error } = useSelector(state => state.friendRequest);

//   here we are extracting the data from the response objects
  const receiveRequest = responseReceiveRequest?.data || []
  const sendRequest = responseSendRequest?.data || []

  useEffect(() => {
    if (receiveRequesterror) {
      toast.error(receiveRequesterror);
    }
    if (sendRequesterror) {
      toast.error(sendRequesterror);
    }
    if(error){
        toast.error(error);
    }
  }, [receiveRequesterror, sendRequesterror, error]);

//   this useEffect is for fetching the friend requests
  useEffect(() => {
    dispatch(getFriendRequestReceiveThunk());
    dispatch(getFriendRequestSendThunk());
  }, []);


//   function to close the popup
  const cancelPendingBtn = () =>{
    setIsPopUpOpen(false);
  }

//  this function is for canceling the friend request
  const cancelConfirmBtn = () => {
    const data = {
        requestReceiverId: ReceiverUserId
    }
    dispatch(rejectRequestThunk(data)) 
    setIsPopUpOpen(false);
  }

//   this function is for accepting the friend request
  const requestAcceptHandler = (id) =>{
    const data = {
        senderId: id
    }
    dispatch(acceptRequestThunk(data))
  }
  return (
    <div className="w-full h-full bg-[var(--bg-color)] flex flex-col items-center relative">

        {/* popup box code starts here */}
            <div className={`bg-black/50 fixed top-0 left-0 w-full h-full flex ${isPopUpOpen ? "flex" : "hidden"} justify-center items-center `}>
                 <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6 bg-[var(--bg-color)] text-[var(--text-color)] w-[85%] max-w-[320px] rounded-md">
                    <h4 className='text-[1.3rem] sm:text-[1.5rem] font-semibold'>Confirmation</h4>
                    <p className='text-[var(--dark-shade)] text-[0.95rem] sm:text-[1rem] mt-1'>Are you sure to cancel this {activeState === "Send" && "pending" } request?</p>
                    <div className='flex justify-between w-full pt-4'>
                        <button onClick={() => cancelPendingBtn()} className='border-2 rounded-full w-[49%] sm:text-[1.1rem] text-[var(--dark-shade)] py-2 font-semibold cursor-pointer'>Cancel</button>
                        <button onClick={() => cancelConfirmBtn()} className='bg-[var(--blue-color)] text-white w-[49%] sm:text-[1.1rem]  py-2 rounded-full font-semibold cursor-pointer'>Sure</button>
                    </div>
                </div>
            </div>
        {/* popup box code ends here */}

      <div className="flex items-center gap-6 sm:gap-6 bg-[var(--light-shade)] text-[var(--dark-shade)] px-4 py-4 w-full">
        <div
          className="bg-[var(--blue-color)] p-[4.5px] px-[8px] rounded-full"
          onClick={backHandler}
        >
          <i className="ri-arrow-left-line text-[1rem] sm:text-[1.6rem] font-semibold cursor-pointer text-white"></i>
        </div>
        <h5 className="text-[1.6rem] sm:text-[1.9rem] font-semibold">
          Friend Request
        </h5>
      </div>
      <div className="w-full flex justify-between items-center ">
        <div
            onClick={()=>setActiveState("Receive")}
            className={`w-[50%] text-center border-b-3 font-semibold text-[17px]  py-[12px] cursor-pointer ${
                activeState == "Receive"
                ? "border-[var(--blue-color)]"
                : "border-transparent"
            }`}
            >
          <h5>Receive</h5>
        </div>
        <div
            onClick={()=>setActiveState("Pending")}
            className={`w-[50%] text-center border-b-3 font-semibold  text-[17px]  py-[12px] cursor-pointer ${
                activeState == "Pending"
                ? "border-[var(--blue-color)]"
                : " border-transparent"
            }`}
        >
          <h5>Pending</h5>
        </div>
      </div>

      {isLoading && <Loader />}

      {!receiveRequestLoading &&
      !sendRequestloading &&
      !receiveRequesterror &&
      !sendRequesterror &&
      activeState === "Receive" ? (
        <div className="w-full h-full ">
          <ul className="w-full h-full">
            {receiveRequest && receiveRequest.length > 0 ? (
              receiveRequest.map((res, ind) => (
                <li key={ind} className="w-full h-[145px]  flex flex-col justify-center py-3   gap-4 border-b-1 border-gray-300">
                  <div className="flex px-3 items-center">
                    <div className="w-14 h-14  rounded-full overflow-hidden flex mr-3">
                      <img
                        className="w-full h-full object-cover"
                        src={res.profilePic}
                        alt="Profile Image"
                      />
                    </div>
                    <h4 className="font-semibold">
                      {res.firstName} {res.lastName}
                    </h4>
                  </div>
                  <div className="flex w-full gap-2 px-3 mb-2">
                    <button onClick={()=>{setIsPopUpOpen(true); setReceiverUserId(res._id)}} className="w-[50%] rounded-md cursor-pointer bg-gray-300 font-semibold p-2">
                      Reject
                    </button>
                    <button onClick={()=>{requestAcceptHandler(res._id)}} className="w-[50%] rounded-md bg-[var(--blue-color)] text-white font-semibold cursor-pointer p-2">
                      Accept
                    </button>
                  </div>
                </li>
              ))
            ) : (
               <div className="w-full h-[90%] text-gray-500 text-[1.1rem] flex flex-col justify-center items-center">
                <i className="ri-user-search-line text-[1.8rem]"></i>
                <p>
                    No request yet
                </p>
              </div>
            )}
          </ul>
        </div>
      ) : (
        <div className="w-full h-full">
          <ul className="w-full h-full">
            {sendRequest && sendRequest.length > 0 ? (
              sendRequest.map((res, ind) => (
                <li key={ind} className="w-full h-[85px]  flex flex-col justify-center py-3   gap-4 border-b-1 border-gray-300">
                  <div className="flex px-3 items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="w-14 h-14  rounded-full overflow-hidden flex mr-3">
                        <img
                          className="w-full h-full object-cover"
                          src={res.profilePic}
                          alt="Profile Image"
                        />
                      </div>
                      <h4 className="font-semibold capitalize text-[17px]">
                        {res.firstName} {res.lastName}
                      </h4>
                    </div>
                    <div onClick={()=>{setIsPopUpOpen(true); setReceiverUserId(res._id)}} className="bg-gray-300 p-[7px] px-[11px] rounded-full text-black cursor-pointer">
                      <i className="ri-close-large-line"></i>
                    </div>
                  </div>
                </li>
            
              ))
            ) : (
              <div className="w-full h-[90%] text-gray-500 text-[1.1rem] flex flex-col justify-center items-center">
                <i className="ri-user-search-line text-[1.8rem]"></i>
                <p>
                    No pending requests yet
                </p>
              </div>
            )}
            </ul>
        </div>
      )}
    </div>
  );
};

export default FriendRequestComponent;
