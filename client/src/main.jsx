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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.REACT_APP_CLIENT_ID}
      activeChain="sepolia"
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: factoryAddress,
          gasless: true,
        }),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
