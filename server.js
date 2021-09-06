require("dotenv").config();
const express = require("express");
const cors = require("cors")
const configDb = require("./config/db");
const morgan    = require("morgan")
configDb();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).send("Api is running!");
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
