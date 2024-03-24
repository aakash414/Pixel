import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../web3_client/web3_logic.jsx'
import DisplayCards from './DisplayCards';

const CardGallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="h-screen">
    <DisplayCards 
      title="All Products"
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </div>
  )
}

export default CardGallery