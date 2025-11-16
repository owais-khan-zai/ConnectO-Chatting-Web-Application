import React from 'react'

const ThemeToggleBtn = () => {

    const toggleHandler = () =>{

    }

  return (
    <div className='cursor-pointer'>
        <div onClick={toggleHandler} className='w-[50px] sm:w-[56px] sm:h-[29px] rounded-[4vw] h-[25px] bg-[var(--blue-color)] flex items-center relative'>
            <div className='ball w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] rounded-full bg-white absolute top-1/2 left-[3px] translate-y-[-50%]'>
            </div>
        </div>
    </div>
  )
}

export default ThemeToggleBtn
