const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
app.use(cors());
app.use(express.json());  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login',(req,res)=>{
  const { email, password } = req.body;
  console.log(email,password)
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})