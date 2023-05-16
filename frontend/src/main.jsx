import React from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import "./styles/index.css";
import { StateContextProvider } from "./context";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={CeloAlfajoresTestnet}>
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
