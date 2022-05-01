const express = require("express");

const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const path = require("path");
const postRoute = require("./routes/post");
const cors = require('cors')


app.use(express.json());
app.use(cors())
dotenv.config({ path: "./config/.env" });

require("./DB/db");

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(7000, () => {
  console.log("Backend server is running!");
});
