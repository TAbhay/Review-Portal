const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const configDb = require("./config/db");
const morgan = require("morgan")
const fileUpload = require('express-fileupload')
const path = require('path')
configDb();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"));
app.use(
	fileUpload({
		useTempFiles: true,
	})
)
app.use('/api/admin', require('./routes/adminRouter'));
app.use('/api/seeder', require('./routes/seedRouter'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api', require('./routes/projectRouter'));
app.use('/api', require('./routes/reviewRouter'));
app.use('/api', require('./routes/upload'))

// __dirname = path.resolve();

// if(process.env.NODE_ENV === 'production'){

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'build', ''))
})
// }
// else{

// app.get("/", (req, res) => {
// 	res.status(200).send("Api is running!");
//   });
// }


app.listen(process.env.PORT, console.log(`Server is running on port ${PORT}`));
