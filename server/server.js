const express = require('express')
const ondc = require("ondc-node");
const app = express()
require('dotenv').config()
const cors = require('cors');
require("json-circular-stringify");
const axios = require('axios')
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const OnrampSessionResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: 'crypto/onramp_sessions',
  }),
});
const port = 3001
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
   
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/create-onramp-session", async (req, res) => {
  const { transaction_details } = req.body;
  console.log(transaction_details,"transaction_details")

  // Create an OnrampSession with the order amount and currency
  const onrampSession = await new OnrampSessionResource(stripe).create({
    transaction_details: {
      destination_currency: transaction_details["destination_currency"],
      destination_exchange_amount: transaction_details["destination_exchange_amount"],
      destination_network: transaction_details["destination_network"],
    },
    customer_ip_address: req.socket.remoteAddress,
  });
  console.log(onrampSession,"onrampSession")

  res.send({
    clientSecret: onrampSession.client_secret,
  });
});


app.post('/search', async (req, res) => {
  try {
    // Extract search parameters from request body
    console.log(req.body.searchParam, "searchParam")
    const url = "https://ps-bap-client.becknprotocol.io/search";
    // const url = "http://localhost:3000/";
    // const authToken = 'Signature keyId="bpp.dbs.digiit.io|164|ed25519",algorithm="ed25519",created="1655897034",expires="1655900634",headers="(created) (expires) digest",signature="ddTKLg7eq3EXZGqPJhrDlwoTku3sTt/c7K4iRnAna+dC9x+hmBM6z+YZRnCu3WRj3dfZDOoi57U4hOoPXP/SCA=="';
    
    const requestData = {
      "context": {
        "location": {
          "country": {
              "code": "IND"
          },
          "city": {
              "code": "std:080"
          }
        },
        "domain": "local-retail",
        "timestamp": "2023-03-23T04:41:16Z",
        "bap_id": "ps-bap-network.becknprotocol.io",
        "transaction_id": "8100d125-76a7-4588-88be-81b97657cd09",
        "city": "std:080",
        "version": "1.1.0",
        "action": "search",
        "bap_uri": "https://ps-bap-network.becknprotocol.io/",
        "bpp_id": "beckn-sandbox-bpp.becknprotocol.io",
        "bpp_url": "https://sandbox-bpp-network.becknprotocol.io",
      },
      "message": {
        "intent": {
          "item": {
            "descriptor": {
                "name": "coffee"
            }
        },
        "fulfillment": {
          "end": {
              "location": {
                  "gps": "12.4535445,77.9283792"
              }
          }
      }
        }
      }
    };

    const response = await axios.post(url, requestData);

    console.log((response.data), "response");

    res.send((response.data));
    // clg
  } catch (error) {
    // Handle errors
    console.error('Error searching in ONDC:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})