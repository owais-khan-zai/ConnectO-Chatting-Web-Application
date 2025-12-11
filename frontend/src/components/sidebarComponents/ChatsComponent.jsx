import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";


const ChatsComponent = () => {


  const people = [
    {
      id: 1,
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      headline: "Creative Designer",
      date: "Today",
    },
    {
      id: 2,
      name: "Michael Smith",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      headline: "Tech Enthusiast",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "Sophia Brown",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      headline: "UI/UX Specialist",
      date: "08/14/2025",
    },
    {
      id: 4,
      name: "David Wilson",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      headline: "Marketing Lead",
      date: "06/21/2025",
    },
    {
      id: 5,
      name: "Emma Davis",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      headline: "Product Manager",
      date: "Yesterday",
    },
    {
      id: 6,
      name: "James Miller",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      headline: "Software Dev",
      date: "07/11/2025",
    },
    {
      id: 7,
      name: "Olivia Taylor",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      headline: "Content Creator",
      date: "Today",
    },
    {
      id: 8,
      name: "William Anderson",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      headline: "Finance Expert",
      date: "09/05/2025",
    },
  ];

  
  return (
    <div className=" pb-[5.5rem] mt-[4.3rem] sm:mt-[5.6rem] sm:pb-[110px]">


      <div className="h-full overflow-y-scroll  chatsContainer">
        <div className="w-[95%] md:w-[98%] relative p-[0.6rem] sm:py-[10px] px-3  border-1  border-gray-300 rounded-3xl flex justify-between mx-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none  text-[1rem] sm:text-[17px]"
          />
          <i className="ri-search-line  text-[1.05rem] sm:text-[18.5px] sm:pr-1  text-gray-500 pl-2 cursor-pointer"></i>
        </div>
        <div className="mt-2">
          {people.map((people) => {
            return (
              <div
                key={people.id}
                className="flex  px-4  py-[0.6rem] sm:py-[10px] items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className=" w-[3.2rem] sm:w-[58px] bg-blue-900 rounded-full overflow-hidden">
                    <img
                      src={people.image}
                      alt="Profile Pic"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-[1px]">
                    <h5 className="text-[0.95rem] sm:text-[18.5px] text-[var(--text-color)] font-semibold">
                      {people.name}
                    </h5>
                    <h6 className="text-gray-500 text-[0.85rem] sm:text-[16px]">
                      {people.headline}
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <h5 className="text-[0.8rem] sm:text-[15px]">{people.date}</h5>
                  <h6 className="min-w-[18px] min-h-[18px] px-1 text-white flex items-center justify-center rounded-full text-[0.7rem] sm:text-[12px] bg-blue-500">
                    0
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default ChatsComponent;
