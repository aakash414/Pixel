import React,{useState} from 'react';
import tagType from '../assets/type.svg';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';

const Card = ({ image, category, amount,myorder,share }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <img src={image} alt={category} className="w-full h-[158px] object-cover rounded-[15px]"/>
    
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center justify-between mb-[18px] ">
          <div className="flex items-center">
            <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{category}</p>
          </div>
          { !myorder && <div className="flex items-center">
            <button onClick={handleDecrement} className="w-[17px] h-[17px] filter invert mr-3">
              <img src={minus} alt="minus" />
            </button>
            <span className="text-white">{count}</span>
            <button onClick={handleIncrement} className="w-[17px] h-[17px] filter invert ml-3">
              <img src={plus} alt="plus" />
            </button>
          </div>}
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="block">
            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{category}</h3>
            <p className="mt-[5px] font-epilogue  font-[12px] text-[#808191] text-left leading-[18px] truncate">{amount}</p>
          </div>
          { !myorder && 
            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-3 rounded-2xl transform transition duration-300 hover:scale-105">
            Submit
          </button>}
          {myorder && <p className='text-white'>Share : {share}</p>}
        </div>
      </div>
    </div>
  );
}

export default Card;
