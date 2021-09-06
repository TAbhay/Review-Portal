/* eslint-disable no-undef */
const mongoose = require("mongoose");

const configDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch (error) {
    console.log("here \n");
    console.log(error);
    throw error;
  }
};

module.exports = configDb;
