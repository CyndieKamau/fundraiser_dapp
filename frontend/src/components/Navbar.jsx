import React, {useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navlinks } from '../constants';
import { logo, menu, search, thirdweb } from '../assets';
import { CustomButton } from './';


const Navbar = () => {
    const navigate = useNavigate();
    const[isActive, setIsActive] = useState('dashboard');
    const[toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#2f2f3b] rounded-[100px]">
            <input type="text" placeholder="Search for Projects" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#777d8f] text-white bg-transparent outline-none" />

            <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
            </div>
        </div>

        <div className="sm:flex hidden flex-row justify-end gap-4">
            <CustomButton />
        </div>
      
    </div>
  )
}

export default Navbar
