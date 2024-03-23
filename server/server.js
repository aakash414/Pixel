const express = require('express')
const ondc = require("ondc-node");
const app = express()
const cors = require('cors');
require("json-circular-stringify");
const axios = require('axios')
const port = 3001
app.use(cors());
app.use(express.json());  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login',(req,res)=>{
  const { email, password } = req.body;
  console.log(email,password)
})

app.post('/register',(req,res)=>{
  const { email, password } = req.body;
  console.log(email,password)
})

app.post('/search', async (req, res) => {
  try {
    // Extract search parameters from request body
    const url = "https://sandbox-ondc.setu.co/search";
    const authToken = 'Signature keyId="bpp.dbs.digiit.io|164|ed25519",algorithm="ed25519",created="1655897034",expires="1655900634",headers="(created) (expires) digest",signature="ddTKLg7eq3EXZGqPJhrDlwoTku3sTt/c7K4iRnAna+dC9x+hmBM6z+YZRnCu3WRj3dfZDOoi57U4hOoPXP/SCA=="';
    
    const requestData = {
      "context": {
        "country": "IND",
        "domain": "retail_store",
        "timestamp": "2023-03-23T04:41:16Z",
        "bap_id": "beckn-sandbox-bap.becknprotocol.io",
        "transaction_id": "7afe44fd-d947-4a0a-81bc-d286784df2c1",
        "city": "std:080",
        "core_version": "0.9.4",
        "action": "search",
        "bap_uri": "https://sandbox-bap-network.becknprotocol.io"
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

    const response = await axios.post(url, requestData, {
      headers: {
        'Authorization': authToken,
      }
    });

    console.log((response.data), "response");

    res.send(response.data.message.catalog);
  } catch (error) {
    // Handle errors
    console.error('Error searching in ONDC:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})