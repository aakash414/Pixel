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

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});


app.post('/search', async (req, res) => {
  try {
    // Extract search parameters from request body
    console.log(req.body.searchParam, "searchParam")
    const url = "http://localhost:3000/search";
    // const url = "http://localhost:3000/";
    const authToken = 'Signature keyId="bpp.dbs.digiit.io|164|ed25519",algorithm="ed25519",created="1655897034",expires="1655900634",headers="(created) (expires) digest",signature="ddTKLg7eq3EXZGqPJhrDlwoTku3sTt/c7K4iRnAna+dC9x+hmBM6z+YZRnCu3WRj3dfZDOoi57U4hOoPXP/SCA=="';
    
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
        "domain": "mobility:ridehailing:0.8.0",
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
            "fulfillment": {
                "start": {
                    "location": {
                        "gps": "12.903561,77.5939631"
                    }
                },
                "end": {
                    "location": {
                        "gps": "12.903561,77.5939631"
                    }
                }
            }
        }
    }
    };

    const response = await axios.post(url, requestData);

    // console.log((response.data), "response");
    const dummyResponse =  {
      id: 4,
      image: "",
      amount: 12000,
      category: req.body.searchParam,
    }

    res.send((dummyResponse));
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