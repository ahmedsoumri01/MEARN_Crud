require("dotenv").config();
const express = require("express");
const app = express();
require("./DB/connection");
const cors = require("cors");
const employeee = require("./Routes/route")
const productRouter = require("./Routes/products");
app.use(cors());
app.use(express.json());
app.use(employeee);
app.use(productRouter);
app.listen(5000, () => {
  console.log("server is running at port 5000");
});
