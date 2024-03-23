import React from 'react';
import Card from '../components/Card';
import search from '../assets/search.svg';
import Books from '../assets/Books.jpg';
import Clothes from '../assets/clothes.jpg';
import Rice from '../assets/rice.jpg';
import Stationary from '../assets/stationary.jpg';
import Wheat from '../assets/wheatsack.jpg';

const Displaycards = () => {
  const cardsData = [ 
    {
      id: 1,
      image: Books,
      amount: 10000,
      category: 'Book'
    },
    {
      id: 2,
      image: Clothes,
      amount: 20000,
      category: 'Clothes'
    },
    {
      id: 3,
      image: Rice,
      amount: 8000,
      category: 'Rice'
    },
    {
      id: 4,
      image: Stationary,
      amount: 12000,
      category: 'Stationary'
    },
    {
      id: 5,
      image: Wheat,
      amount: 12000,
      category: 'Wheat'
    }
  ];

  return (
    <div className="pt-4">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]" >
        <input type="text" placeholder="search for product" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"/>
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain filter invert"/>
        </div>
      </div>
    
      <div className="sm:flex hidden flex-row justify-start gap-5 pt-[4rem]">
        {cardsData.map((card, index) => (
          <Card key={card.id} image={card.image} amount={card.amount} category={card.category} />
        ))}
      </div>
    </div>
  );
}

export default Displaycards;
