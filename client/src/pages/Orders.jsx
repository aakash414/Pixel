import React from 'react'
import Card from '../components/Card';
import Books from "../assets/Books.jpg";
import Clothes from "../assets/clothes.jpg";
import Rice from "../assets/rice.jpg";
import Stationary from "../assets/stationary.jpg";
import Wheat from "../assets/wheatsack.jpg";

function Orders() {
    const cardsData = [
        {
          id: 1,
          image: Books,
          amount: 10000,
          category: "Book",
          share : "10"
        },
        {
          id: 2,
          image: Clothes,
          amount: 20000,
          category: "Clothes",
          share : "4"
        },
        {
          id: 3,
          image: Rice,
          amount: 8000,
          category: "Rice",
          share : "4"
        },
        {
          id: 4,
          image: Stationary,
          amount: 12000,
          category: "Stationary",
          share : "4"
        },
        {
          id: 5,
          image: Wheat,
          amount: 12000,
          category: "Wheat",
          share : "4"
        },
      ];
  return (
    <div className=' flex justify-center items-center min-h-min  flex-col m-10'>
      <h1 className='mt-20 text-white text-3xl font-bold'>My orders</h1>
      <div className="sm:flex hidden flex-row justify-start gap-[4rem] pt-[4rem] flex-wrap">
        {cardsData.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            amount={card.amount}
            category={card.category}
            myorder={true}
            share={card.share}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders
