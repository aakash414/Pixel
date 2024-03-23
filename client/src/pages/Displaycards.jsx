import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import search from "../assets/search.svg";
import Books from "../assets/Books.jpg";
import Clothes from "../assets/clothes.jpg";
import Rice from "../assets/rice.jpg";
import Stationary from "../assets/stationary.jpg";
import Wheat from "../assets/wheatsack.jpg";

const Displaycards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Initialize searchResults with cardsData
  useState(() => {
    setSearchResults(cardsData);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    // Simulating local search
    const results = cardsData.filter((card) =>
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (results.length === 0) {
      // If no local results, make a request to the backend using Axios
      try {
        const response = await axios.post(`http://localhost:3001/search`,
          { searchParam: searchQuery }
        );
        console.log(response.data.message)
        // setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    } else {
      setSearchResults(results);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="pt-4 pl-[5rem] bg-gray-900 w-full">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="search for product"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div
          className="w-[72px] h-full rounded-[20px] bg-primary flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain filter invert"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-start gap-[4rem] pt-[4rem] flex-wrap">
        {loading && <p>Loading...</p>}
        {searchResults.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            amount={card.amount}
            category={card.category}
          />
        ))}
        {searchResults.length === 0 && !loading && <p>No results found</p>}
      </div>
    </div>
  );
};

export default Displaycards;
