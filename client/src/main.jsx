import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { activeChain, factoryAddress } from "../const.js";
import { StateContextProvider } from "../web3_client/web3_logic.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_APP_CLIENT_ID}
      activeChain="sepolia"
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          gasless: true,
          factoryAddress: factoryAddress,
        }),
      ]}
    >
      <StateContextProvider>
      <App />
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
