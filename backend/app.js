let express = require("express");
let mongoose = require("mongoose");
app = express();
const router = require("./routes/index");
app.use(express.json());
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://admin:12345@cluster0-shard-00-00.0dxd0.mongodb.net:27017,cluster0-shard-00-01.0dxd0.mongodb.net:27017,cluster0-shard-00-02.0dxd0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pey2bn-shard-0&authSource=admin&retryWrites=true&w=majority"
);

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(
//     "mongodb://admin:12345@cluster0-shard-00-00.0dxd0.mongodb.net:27017,cluster0-shard-00-01.0dxd0.mongodb.net:27017,cluster0-shard-00-02.0dxd0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pey2bn-shard-0&authSource=admin&retryWrites=true&w=majority"
//   );
// }
// app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", router);

app.listen(3000, () => {
  console.log("App work");
});
