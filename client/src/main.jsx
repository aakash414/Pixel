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
      clientId={import.meta.env.VITE_APP_CLIENT_ID}
      activeChain="sepolia"
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          gasless: true,
          factoryAddress: factoryAddress,
        }),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
