const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");
const followerRoute = require("./routes/FollowerRoute");
const messageRoute = require("./routes/MessageRoute");

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", followerRoute);
app.use("/api", messageRoute);

module.exports = app;
