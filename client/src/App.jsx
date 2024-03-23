import React from 'react'
import {
  ThirdwebProvider,
  ConnectWallet,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

function App() {
  return (
    <div>
      <ThirdwebProvider
      activeChain="sepolia"
      clientId="cdd8254e7fc70530f20b83272500e204"
      // locale={en()}
      supportedWallets={[
        localWallet(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              "facebook",
              "apple",
              "google",
            ],
          },
        }),
      ]}
    >
      <ConnectWallet
        theme={"dark"}
        modalSize={"wide"}
      />
    </ThirdwebProvider>
    </div>
  )
}

export default App
