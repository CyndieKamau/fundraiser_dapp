import React from 'react';
import { tagType, thirdweb } from '../assets';
import {daysLeft} from '../utils';



const FundCard = ({projectOwner, projectTitle, projectDescription, target, projectDeadline, fundsCollected, projectImage, handleClick}) => {

  const remainingDays = daysLeft(deadline);

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
        <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>
      
    </div>
  )
}

export default FundCard
