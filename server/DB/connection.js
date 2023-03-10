const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://hamza:hamza@ahmedsmr.v8kgfff.mongodb.net/mern?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => {
    console.error(error.message);
  });
