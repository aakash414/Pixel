import { useEffect } from "react";
import {
  ConnectWallet,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useWallet,
  useClaimNFT,
} from "@thirdweb-dev/react";
import { editionDropAddress } from "../../const";
import Hero from "../components/Hero";
import Displaycards from "./Displaycards";

function Home() {
  const address = useAddress();
  // const { contract } = useContract(editionDropAddress);
  // const { data, isLoading } = useOwnedNFTs(contract, address);
  // const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);
  const walletInstance = useWallet();
  const saveAddressToLocalStorage = (address) => {
    localStorage.setItem("walletAddress", address);
  };

  // Load wallet address from local storage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      // If there's a saved address, you can use it here as needed
      console.log("Wallet address loaded from local storage:", savedAddress);
    }
  }, []);

  console.log(address, "walletInstance");
  return (
    <main className="flex flex-col items-center justify-center w-full max-w-6xl px-4 mx-auto h-screen">
      {walletInstance ? (
        <>
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />
       <Displaycards/>
        </>
      ) : (
        <>
          <Hero />
          <div className="flex flex-col items-center w-16 h-16 max-w-6xl px-4 mx-auto">
            <div className="flex flex-col items-center w-full max-w-6xl px-4 mx-auto">
              <div className="flex flex-col items-center justify-center mb-8">
                <ConnectWallet
                  dropdownPosition={{
                    side: "bottom",
                    align: "center",
                  }}
                />
                {/* {address ? (
      <div className="p-8">
        <Web3Button
          contractAddress={editionDropAddress}
          action={() =>
            claim({
              tokenId: 0,
              quantity: 1,
            })
          }
        >
          Claim Edition NFT
        </Web3Button>
      </div>
    ) : (
      <p></p>
    )} */}
                {/* {address && isLoading ? <p>Loading Owned NFTs...</p> : null}
    {address && !isLoading && data && data.length === 0 ? (
      <p>
        {isClaiming
          ? "Deploying your account and claiming..."
          : "No NFTs, claim one now!"}
      </p>
    ) : null}
    {data &&
      data?.map((nft) => (
        <div
          className="flex flex-col items-center w-full max-w-6xl px-4 mx-auto"
          key={nft.metadata.id}
        >
          <ThirdwebNftMedia metadata={nft.metadata} />
          <p>
            You own {nft.quantityOwned} {nft.metadata.name}
          </p>
        </div>
      ))} */}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
