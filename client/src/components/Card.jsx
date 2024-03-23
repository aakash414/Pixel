import React from 'react';
import Books from '../assets/Books.jpg';
import tagType from '../assets/type.svg';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';

const Card = () => {
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <img src={Books} alt="Books" className="w-full h-[158px] object-cover rounded-[15px]"/>
    
    <div className="flex flex-col p-4">
      <div className="flex flex-row items-center justify-between mb-[18px] ">
        <div className="flex items-center">
        <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
        <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Category</p>
        </div>
        <div className="flex items-center">
        <img src={plus} alt="plus" className="w-[17px] h-[17px] filter invert mr-3"/>
        <img src={minus} alt="plus" className="w-[17px] h-[17px] filter invert"/>
        </div>
        
      </div>
      
      <div className="flex justify-between items-center mb-2">
      <div className="block">
        <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">Total Amount:</h3>
        <p className ="mt-[5px] font-epilogue font-normal font-[12px] text-[#808191] text-left leading-[18px] truncate">10000</p>

      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl">
            Submit
          </button>
      </div>
    </div>
    </div>
  );
}

export default Card;
