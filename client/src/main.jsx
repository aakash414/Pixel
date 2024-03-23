import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChainId, ThirdwebProvider } from "thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider desiredChainId={ChainId.Sepolia}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </ThirdwebProvider>
);
