const express = require('express');
const cors = require('cors')
require('dotenv').config();
const helmet = require("helmet");

const index = require('./routes/index')

// database connection
const connectToMongo = require('./db');
connectToMongo();



const app = express()
const port = process.env.PORT || 5000


// middle ware to fetch data
app.use(express.json())
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", (req, res)=>{
  res.send({"Success":"true"});
})

// Available Routes
app.use('/', index);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})