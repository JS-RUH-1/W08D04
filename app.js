let express = require("express");
let mongoose = require("mongoose");
app = express();
const router = require("./routes/index");
app.use(express.json());
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:12345@cluster0.0dxd0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use("/", router);

app.listen(3000, () => {
  console.log("App work");
});
