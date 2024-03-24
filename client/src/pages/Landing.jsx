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
import Hero from "../components/Hero";
import Displaycards from "./DisplayCards.jsx";

function Home() {
  const address = useAddress();
  // const { contract } = useContract(editionDropAddress);
  // const { data, isLoading } = useOwnedNFTs(contract, address);
  // const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);
  const walletInstance = useWallet();

  // Load wallet address from local storage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (address) {
      if (!savedAddress) {
        console.log("wallet addres in use effect", address);
        // If there's a saved address, you can use it here as needed
        localStorage.setItem("walletAddress", address);
      }
    }
  }, [address]);

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
          <Displaycards />
        </>
      ) : (
        <>
          <Hero />
          <div className="flex flex-col items-center w-16 h-16 max-w-6xl px-4 mx-auto">
            <div className="flex flex-col items-center w-full max-w-6xl px-4 mx-auto">
              <div className="flex flex-col items-center justify-center mb-8">
                {/* <ConnectWallet
                  btnTitle="Login"
                  dropdownPosition={{
                    side: "bottom",
                    align: "center",
                  }}
                  theme={darkTheme({
                    colors: {
                      modalBg: "#9333ea",
                      dropdownBg: "#fdfcfd",
                    },
                  })}
                /> */}
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
