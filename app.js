require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const connectDb = require("./db/conectDB");

app.use(cors());
app.use(express.json());

const port = 7000;

const start = async () => {
  try {
    await connectDb(process.env.DB_CONECTION);
    console.log("db connection established");
    app.listen(port, () => console.log(`app is listening on port${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
