require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//*internal file
const connectDb = require("./db/conectDB");
const userRouter = require("./route/user");
const projectRouter = require("./route/projects");
const issueRouter = require("./route/issue");
const messageRouter = require("./route/message");
const auththentcation = require("./middleware/authe");

//* internals middlewares
app.use(cors());
app.use(express.json());

//* the register & signIn route
app.use("/api/v1", userRouter);
//* the projects route
app.use("/api/v1", projectRouter);
//* the issue route
app.use("/api/v1", auththentcation, issueRouter);
//* the message route
app.use("/api/v1", auththentcation, messageRouter);

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
