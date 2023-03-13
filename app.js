require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//*internal file
const connectDb = require("./db/conectDB");
const userRouter = require("./route/user");
const projectRouter = require("./route/projects");
const issueRouter = require("./route/issue");

//* internals middlewares
app.use(cors());
app.use(express.json());

//* the register & signIn route
app.use("/api/v1", userRouter);
//* the projects route
app.use("/api/v1", projectRouter);
//* the issue route
app.use("/api/v1", issueRouter);

const port = process.env.PORT || 7000;

//* connecting the database and server funiction
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
