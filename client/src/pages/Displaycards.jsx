import Card from "../components/Card";
import search from "../assets/search.svg";
import Rice from "../assets/rice.jpg";
import Stationary from "../assets/stationary.jpg";
import Wheat from "../assets/wheatsack.jpg";
import React, { useState } from 'react';
import Books from '../assets/Books.jpg';
import Orders from "./Orders";
import Clothes from '../assets/clothes.jpg';
import { useContractWrite, useContract } from "@thirdweb-dev/react";
import { poolAddress } from '../../const';


const Displaycards = () => {
const { contract } = useContract(poolAddress);
const { mutate: createPool, isLoading: creatingPool } = useContractWrite(
  contract, // Pass the contract object here
  "createPool" // Name of the function in the smart contract
);

const { mutate: contributeToPool, isLoading: contributingToPool } = useContractWrite(
  contract, // Pass the contract object here
  "contributeToPool" // Name of the function in the smart contract
);

const handleCreateAndContributeToPool = async (contributionTarget, contributionAmount) => {
  try {
    // Create a new pool
    await createPool(contributionTarget);
    // Contribute to the newly created pool
    await contributeToPool(poolId, contributionAmount);
    // Handle success
    console.log("Pool created and contribution successful");
  } catch (error) {
    // Handle error
    console.error("Error creating and contributing to pool:", error);
  }
};

  const [contributionTarget, setContributionTarget] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const cardsData = [ 
    {
      id: 1,
      image: Books,
      amount: 10000,
      category: "Book",
    },
    {
      id: 2,
      image: Clothes,
      amount: 20000,
      category: "Clothes",
    },
    {
      id: 3,
      image: Rice,
      amount: 8000,
      category: "Rice",
    },
    {
      id: 4,
      image: Stationary,
      amount: 12000,
      category: "Stationary",
    },
    {
      id: 5,
      image: Wheat,
      amount: 12000,
      category: "Wheat",
    },
  ];

  return (
    <div className="pt-4 pl-[5rem] bg-gray-900 w-full">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="search for product"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-primary flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain filter invert"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-start gap-[4rem] pt-[4rem] flex-wrap">
        {cardsData.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            amount={card.amount}
            category={card.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Displaycards;
