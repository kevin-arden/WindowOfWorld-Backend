const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = require("./src/routes/");

app.use(cors());
app.use(bodyParser.json());
app.use("/image/", express.static("uploads/image"))
app.use("/ebook", express.static("uploads/book"))
app.use("/api/v1/", router);

const port = 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}, app ready`);
});
