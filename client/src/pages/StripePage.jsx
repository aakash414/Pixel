import React, { useState, useEffect } from "react";
import { loadStripeOnramp } from "@stripe/crypto";

import { CryptoElements, OnrampElement } from '../components/StripeCryptoElements';

// Make sure to call loadStripeOnramp outside of a component’s render to avoid
// recreating the StripeOnramp object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripeOnrampPromise = loadStripeOnramp("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");

export default function StripePage() {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetches an onramp session and captures the client secret
    fetch(
      "http://localhost:3001/create-onramp-session",
      {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction_details: {
          destination_currency: "usdc",
          destination_exchange_amount: "13.37",
          destination_network: "ethereum",
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const onChange = React.useCallback(({ session }) => {
    setMessage(`OnrampSession is now in ${session.status} state.`);
  }, []);

  return (
    <div className="App">
      <CryptoElements stripeOnramp={stripeOnrampPromise}>
        {clientSecret && (
          <OnrampElement
            id="onramp-element"
            clientSecret={clientSecret}
            appearance={{ theme: "dark" }}
            onChange={onChange}
          />
        )}
      </CryptoElements>
      {message && <div id="onramp-message">{message}</div>}
    </div>
  );
}