require("dotenv").config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const configDb = require("./config/db");
const morgan    = require("morgan")
configDb();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"));
app.use('/admin',require('./routes/adminRouter'));
app.use('/seeder',require('./routes/seedRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/api',require('./routes/projectRouter'));
app.use('/api',require('./routes/reviewRouter'));

app.get("/", (req, res) => {
  res.status(200).send("Api is running!");
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
